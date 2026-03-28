import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  username:        string;
  email:           string;
  passwordHash:    string | null;
  role:            "client" | "rival" | "rival_pro" | "admin";
  status:          "active" | "suspended" | "pending_verification";
  displayName?:    string;
  bio?:            string;
  avatarUrl?:      string;
  country?:        string;
  discordId?:      string;
  googleId?:       string;
  rivalProfile?: {
    games:          Array<{ gameId: string; rank?: string; tags?: string[] }>;
    isOnline:       boolean;
    lastSeenAt?:    Date;
    hourlyRate?:    number;
    commissionRate: number;
    totalSessions:  number;
    totalEarnings:  number;
    avgRating:      number;
    reviewCount:    number;
    verificationStatus: "unverified" | "pending" | "verified" | "rejected";
    isPro:          boolean;
  };
  ticketBalance:   number;
  isEmailVerified: boolean;
  ageVerified:     boolean;
  createdAt:       Date;
  updatedAt:       Date;
}

const UserSchema = new Schema<IUser>(
  {
    username:     { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: null, select: false },
    role:         { type: String, enum: ["client", "rival", "rival_pro", "admin"], default: "client" },
    status:       { type: String, enum: ["active", "suspended", "pending_verification"], default: "active" },
    displayName:  String,
    bio:          { type: String, maxlength: 500 },
    avatarUrl:    String,
    country:      String,
    discordId:    { type: String, sparse: true },
    googleId:     { type: String, sparse: true },
    rivalProfile: {
      games:          { type: [{ gameId: String, rank: String, tags: [String] }], default: [] },
      isOnline:       { type: Boolean, default: false },
      lastSeenAt:     Date,
      hourlyRate:     Number,
      commissionRate: { type: Number, default: 0.20 },
      totalSessions:  { type: Number, default: 0 },
      totalEarnings:  { type: Number, default: 0 },
      avgRating:      { type: Number, default: 0 },
      reviewCount:    { type: Number, default: 0 },
      verificationStatus: {
        type:    String,
        enum:    ["unverified", "pending", "verified", "rejected"],
        default: "unverified",
      },
      isPro: { type: Boolean, default: false },
    },
    ticketBalance:   { type: Number, default: 0 },
    isEmailVerified: { type: Boolean, default: false },
    ageVerified:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.index({ "rivalProfile.games.gameId": 1 });
UserSchema.index({ role: 1, "rivalProfile.isOnline": 1 });

export const User = models.User || model<IUser>("User", UserSchema);
