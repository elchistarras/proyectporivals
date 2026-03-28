import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

// Mock data for when DB is not connected
const MOCK_RIVALS = [
  { username:"shadowstrike", displayName:"ShadowStrike", games:["Valorant","CS2"],         isOnline:true,  avgRating:4.9, totalSessions:312, hourlyRate:15, isPro:true  },
  { username:"neonbyte",     displayName:"NeonByte",     games:["League of Legends"],       isOnline:true,  avgRating:4.7, totalSessions:187, hourlyRate:10, isPro:false },
  { username:"darkwolf99",   displayName:"DarkWolf",     games:["Fortnite","Apex"],         isOnline:false, avgRating:4.5, totalSessions:240, hourlyRate:12, isPro:false },
  { username:"crystalqueen", displayName:"CrystalQueen", games:["Minecraft","Roblox"],      isOnline:true,  avgRating:4.8, totalSessions:95,  hourlyRate:8,  isPro:false },
  { username:"bladestorm",   displayName:"BladeStorm",   games:["Valorant","Overwatch 2"],  isOnline:true,  avgRating:4.6, totalSessions:430, hourlyRate:18, isPro:true  },
  { username:"phoenixrise",  displayName:"PhoenixRise",  games:["Genshin","FF XIV"],        isOnline:true,  avgRating:5.0, totalSessions:512, hourlyRate:20, isPro:true  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const game   = searchParams.get("game");
    const online = searchParams.get("online") === "true";

    await connectDB();

    const query: Record<string, unknown> = { role: { $in: ["rival", "rival_pro"] } };
    if (online) query["rivalProfile.isOnline"] = true;
    if (game)   query["rivalProfile.games.gameId"] = game;

    const rivals = await User.find(query)
      .select("username displayName avatarUrl rivalProfile.games rivalProfile.isOnline rivalProfile.avgRating rivalProfile.totalSessions rivalProfile.hourlyRate rivalProfile.isPro role")
      .limit(50)
      .lean();

    return NextResponse.json({ rivals });
  } catch {
    // Return mock data if DB is unavailable (dev mode)
    return NextResponse.json({ rivals: MOCK_RIVALS, source: "mock" });
  }
}
