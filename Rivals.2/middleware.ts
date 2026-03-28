import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/dashboard", "/credits", "/messages", "/admin"];
const rivalRoutes     = ["/dashboard", "/credits/withdraw"];
const adminRoutes     = ["/admin"];

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const role = session?.user && "role" in session.user
    ? (session.user as unknown as { role: string }).role
    : "";

  if (rivalRoutes.some((r) => pathname.startsWith(r))) {
    if (!session || !["rival", "rival_pro", "admin"].includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (!session || role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
