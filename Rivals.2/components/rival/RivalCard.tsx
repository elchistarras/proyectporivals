"use client";

import Link from "next/link";

const AVATARS = ["🎮","⚔️","🥷","👑","⚡","❄️","🔥","🧙","🐍","🌙","🐉","⭐","🎯","🛡️","💥","🦊"];

function getEmoji(username: string): string {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = (hash * 31 + username.charCodeAt(i)) >>> 0;
  }
  return AVATARS[hash % AVATARS.length];
}

function getLevel(sessions: number, rating: number): number {
  return Math.min(99, 10 + Math.floor(sessions / 15) + Math.floor(rating * 2));
}

interface RivalCardProps {
  username:      string;
  displayName:   string;
  avatarUrl?:    string;
  games:         string[];
  isOnline:      boolean;
  avgRating:     number;
  totalSessions: number;
  hourlyRate:    number;
  isPro?:        boolean;
}

export default function RivalCard({
  username,
  displayName,
  games,
  isOnline,
  avgRating,
  totalSessions,
  isPro,
}: RivalCardProps) {
  const emoji = getEmoji(username);
  const level = getLevel(totalSessions, avgRating);

  return (
    <Link href={`/profile/${username}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="rival-card">

        {isPro && (
          <span style={{
            position:      "absolute",
            top:           12,
            right:         12,
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      10,
            fontWeight:    700,
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            background:    "rgba(239,184,16,0.1)",
            border:        "1px solid rgba(239,184,16,0.3)",
            color:         "#efb810",
            padding:       "2px 8px",
            borderRadius:  2,
          }}>
            PRO
          </span>
        )}

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{
            fontSize:       "3rem",
            filter:         "drop-shadow(0 2px 8px rgba(255,45,45,0.2))",
            width:          60,
            height:         60,
            background:     "var(--bg)",
            border:         "1px solid var(--border)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
          }}>
            {emoji}
          </div>
          <div>
            <h3 style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      20,
              fontWeight:    700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color:         "var(--text)",
              marginBottom:  3,
            }}>
              {displayName}
            </h3>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>@{username}</p>
          </div>
        </div>

        {/* Status dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{
            width:        8,
            height:       8,
            borderRadius: "50%",
            background:   isOnline ? "var(--online)" : "#333",
            boxShadow:    isOnline ? "0 0 8px var(--online)" : "none",
            animation:    isOnline ? "blink 2s infinite" : "none",
            flexShrink:   0,
            display:      "inline-block",
          }} />
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      13,
            fontWeight:    600,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color:         isOnline ? "var(--online)" : "var(--muted)",
          }}>
            {isOnline ? "En línea" : "Desconectado"}
          </span>
        </div>

        {/* Game tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 20 }}>
          {games.slice(0, 3).map((game) => (
            <span key={game} style={{
              padding:       "4px 10px",
              background:    "rgba(255,45,45,0.08)",
              border:        "1px solid rgba(255,45,45,0.2)",
              borderRadius:  2,
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      12,
              fontWeight:    700,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color:         "var(--red)",
            }}>
              {game}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 12,
          paddingTop:          16,
          borderTop:           "1px solid var(--border)",
        }}>
          {[
            { value: `Nv.${level}`,        label: "nivel"     },
            { value: `${totalSessions}`,   label: "victorias" },
            { value: avgRating.toFixed(1), label: "rating"    },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" as const }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize:   28,
                color:      "var(--red)",
                lineHeight: 1,
                display:    "block",
              }}>
                {value}
              </span>
              <span style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color:         "var(--muted)",
                marginTop:     4,
                display:       "block",
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
