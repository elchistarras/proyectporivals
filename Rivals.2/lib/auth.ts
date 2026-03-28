import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error:  "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",      type: "text"     },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const user = await User.findOne({
          $or: [
            { email:    (credentials.email as string).toLowerCase() },
            { username: credentials.email },
          ],
        }).select("+passwordHash");

        if (!user || !user.passwordHash) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!valid) return null;

        return {
          id:      user._id.toString(),
          email:   user.email,
          name:    user.username,
          image:   user.avatarUrl ?? null,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          role:    user.role as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tickets: user.ticketBalance as any,
        };
      },
    }),

    DiscordProvider({
      clientId:     process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "discord" || account?.provider === "google") {
        await connectDB();

        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          const update: Record<string, string> = {};
          if (account.provider === "discord") update.discordId = account.providerAccountId;
          if (account.provider === "google")  update.googleId  = account.providerAccountId;

          const baseUsername = (user.email ?? "user")
            .split("@")[0]
            .replace(/[^a-zA-Z0-9_]/g, "")
            .slice(0, 16);

          await User.create({
            email:           user.email,
            username:        baseUsername + Math.floor(Math.random() * 1000),
            displayName:     user.name,
            avatarUrl:       user.image,
            passwordHash:    null,
            ageVerified:     false,
            isEmailVerified: true,
            ...update,
          });
        } else {
          if (account.provider === "discord" && !existing.discordId) {
            await User.findByIdAndUpdate(existing._id, { discordId: account.providerAccountId });
          }
          if (account.provider === "google" && !existing.googleId) {
            await User.findByIdAndUpdate(existing._id, { googleId: account.providerAccountId });
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id      = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role    = (user as any).role;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.tickets = (user as any).tickets;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id      = token.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role    = token.role;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).tickets = token.tickets;
      }
      return session;
    },
  },
});
