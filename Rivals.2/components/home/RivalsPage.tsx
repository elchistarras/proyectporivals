"use client";

import { useState, useEffect } from "react";
import RivalCard from "@/components/rival/RivalCard";

type Tab        = "rivals" | "servicios" | "comunidad";
type ServiceTab = "gaming" | "echat" | "entretenimiento" | "coaching";

/* ── Mock data ── */
const MOCK_RIVALS = [
  { username:"shadowstrike",  displayName:"ShadowStrike",  games:["Valorant","CS2"],          isOnline:true,  avgRating:4.9, totalSessions:312, hourlyRate:15, isPro:true  },
  { username:"neonbyte",      displayName:"NeonByte",      games:["League of Legends"],        isOnline:true,  avgRating:4.7, totalSessions:187, hourlyRate:10, isPro:false },
  { username:"darkwolf99",    displayName:"DarkWolf",      games:["Fortnite","Apex"],          isOnline:false, avgRating:4.5, totalSessions:240, hourlyRate:12, isPro:false },
  { username:"crystalqueen",  displayName:"CrystalQueen",  games:["Minecraft","Roblox"],       isOnline:true,  avgRating:4.8, totalSessions:95,  hourlyRate:8,  isPro:false },
  { username:"bladestorm",    displayName:"BladeStorm",    games:["Valorant","Overwatch 2"],   isOnline:true,  avgRating:4.6, totalSessions:430, hourlyRate:18, isPro:true  },
  { username:"frozenecho",    displayName:"FrozenEcho",    games:["CS2","Warzone"],            isOnline:false, avgRating:4.3, totalSessions:67,  hourlyRate:7,  isPro:false },
  { username:"phoenixrise",   displayName:"PhoenixRise",   games:["Genshin","FF XIV"],         isOnline:true,  avgRating:5.0, totalSessions:512, hourlyRate:20, isPro:true  },
  { username:"titanfall",     displayName:"TitanFall",     games:["Apex Legends"],             isOnline:false, avgRating:4.4, totalSessions:155, hourlyRate:9,  isPro:false },
  { username:"lunarstrike",   displayName:"LunarStrike",   games:["Valorant"],                 isOnline:true,  avgRating:4.7, totalSessions:201, hourlyRate:11, isPro:false },
  { username:"stormrider",    displayName:"StormRider",    games:["Fortnite","Warzone"],       isOnline:true,  avgRating:4.9, totalSessions:378, hourlyRate:16, isPro:true  },
  { username:"voidwalker",    displayName:"VoidWalker",    games:["League of Legends","TFT"],  isOnline:false, avgRating:4.2, totalSessions:88,  hourlyRate:8,  isPro:false },
  { username:"ironclad",      displayName:"IronClad",      games:["CS2","Valorant"],           isOnline:true,  avgRating:4.6, totalSessions:299, hourlyRate:14, isPro:false },
];

const GAMES_FILTER = ["Todos","Valorant","League of Legends","CS2","Fortnite","Apex Legends","Minecraft","Warzone"];

const TOP_10 = [...MOCK_RIVALS]
  .sort((a, b) => b.avgRating * b.totalSessions - a.avgRating * a.totalSessions)
  .slice(0, 10);

const AVATAR_EMOJIS = ["🎮","⚔️","🥷","👑","⚡","❄️","🔥","🧙","🐍","🌙","🐉","⭐","🎯","🛡️","💥","🦊"];
function getEmoji(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) hash = (hash * 31 + username.charCodeAt(i)) >>> 0;
  return AVATAR_EMOJIS[hash % AVATAR_EMOJIS.length];
}

/* ── Servicios ── */
const SERVICE_CATEGORIES: Record<ServiceTab, { icon: string; title: string; desc: string; price: string }[]> = {
  gaming: [
    { icon:"⚔️", title:"Partidas Ranked",         desc:"Sube de rango con un Rival experimentado a tu lado.",          price:"15 tickets/h"  },
    { icon:"🎯", title:"Aim Training",             desc:"Mejora tu puntería con sesiones guiadas.",                      price:"12 tickets/h"  },
    { icon:"🗺️", title:"VOD Review",              desc:"Analizamos tus replays y encontramos qué mejorar.",             price:"20 tickets/ses" },
    { icon:"🏆", title:"Torneo Coaching",          desc:"Preparación intensiva antes de tu próximo torneo.",             price:"25 tickets/h"  },
  ],
  echat: [
    { icon:"💬", title:"Chat de Acompañamiento",  desc:"Conversación casual mientras juegas o simplemente chateas.",    price:"8 tickets/h"   },
    { icon:"🎧", title:"Gaming Partner",           desc:"Alguien con quien hablar mientras exploras mundos virtuales.",  price:"10 tickets/h"  },
    { icon:"🌟", title:"Fan Experience",           desc:"Sesión exclusiva con tu Rival favorito.",                       price:"30 tickets/h"  },
  ],
  entretenimiento: [
    { icon:"🎵", title:"Karaoke Online",           desc:"Canta con tu Rival en una sesión privada.",                    price:"15 tickets/h"  },
    { icon:"🎲", title:"Juegos de Mesa Online",    desc:"Ajedrez, Catan, Pictionary... elige tu juego.",                price:"10 tickets/h"  },
    { icon:"📺", title:"Watch Party",              desc:"Ve tu serie o película favorita acompañado.",                  price:"8 tickets/h"   },
    { icon:"🃏", title:"Poker Night",              desc:"Sesiones de póker amistoso en línea.",                         price:"12 tickets/h"  },
  ],
  coaching: [
    { icon:"📊", title:"Análisis de Gameplay",    desc:"Revisión profunda de tus estadísticas y estilo de juego.",     price:"25 tickets/ses" },
    { icon:"🧠", title:"Mentalidad Competitiva",  desc:"Coaching mental para rendir mejor bajo presión.",               price:"30 tickets/h"  },
    { icon:"📝", title:"Plan de Mejora",           desc:"Hoja de ruta personalizada para subir de nivel.",              price:"20 tickets/ses" },
    { icon:"🎓", title:"Coaching Pro",             desc:"Sesiones con Rivals Pro certificados.",                        price:"40 tickets/h"  },
  ],
};

/* ── Posts comunidad ── */
const POSTS = [
  { id:1, author:"ShadowStrike", emoji:"🥷", time:"hace 2h",  title:"Guía: Cómo rankear en Valorant sin tiltearse",                   likes:142, comments:38 },
  { id:2, author:"CrystalQueen", emoji:"👑", time:"hace 5h",  title:"Mi experiencia como Rival después de 300 sesiones",              likes:89,  comments:21 },
  { id:3, author:"PhoenixRise",  emoji:"🔥", time:"hace 1d",  title:"Top 5 errores que cometen los nuevos en ranked",                 likes:203, comments:57 },
  { id:4, author:"StormRider",   emoji:"⚡", time:"hace 2d",  title:"Cómo mejorar tu mentalidad competitiva",                         likes:176, comments:44 },
  { id:5, author:"NeonByte",     emoji:"🎮", time:"hace 3d",  title:"Review: El nuevo mapa de CS2 desde la perspectiva de un coach",  likes:65,  comments:19 },
];

interface RivalsPageProps {
  activeTab:   Tab;
  onTabChange: (tab: Tab) => void;
}

export default function RivalsPage({ activeTab, onTabChange }: RivalsPageProps) {
  const [search,      setSearch]      = useState("");
  const [gameFilter,  setGameFilter]  = useState("Todos");
  const [onlineOnly,  setOnlineOnly]  = useState(false);
  const [serviceTab,  setServiceTab]  = useState<ServiceTab>("gaming");
  const [carouselIdx, setCarouselIdx] = useState(0);

  const filtered = MOCK_RIVALS.filter((r) => {
    if (onlineOnly && !r.isOnline) return false;
    if (gameFilter !== "Todos" && !r.games.includes(gameFilter)) return false;
    if (search && !r.displayName.toLowerCase().includes(search.toLowerCase()) &&
        !r.username.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % TOP_10.length), 4000);
    return () => clearInterval(t);
  }, []);

  void onTabChange;

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px 80px" }}>

      {/* ═══ TAB: RIVALS ═══ */}
      {activeTab === "rivals" && (
        <>
          {/* Hero */}
          <section style={{ padding: "60px 0 40px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
              PLATAFORMA #1 EN LATAM
            </p>
            <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(48px,8vw,96px)", letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1, marginBottom:8 }}>
              ENCUENTRA TU<br />
              <span style={{ color:"#FF2D2D" }}>RIVAL</span>
            </h1>
            <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:17, color:"#6B6460", marginBottom:40, maxWidth:500 }}>
              Conecta con los mejores jugadores. Sube de nivel. Diviértete más.
            </p>

            {/* Search bar */}
            <div style={{ display:"flex", maxWidth:640, position:"relative" }}>
              <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:18, pointerEvents:"none", zIndex:1 }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar por nombre, juego, estilo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex:       1,
                  padding:    "16px 16px 16px 50px",
                  background: "#111111",
                  border:     "1px solid #222",
                  borderRight:"none",
                  color:      "#F0EDE8",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize:   15,
                  outline:    "none",
                }}
              />
              <button
                style={{
                  padding:       "16px 28px",
                  background:    "#FF2D2D",
                  border:        "none",
                  color:         "#fff",
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      15,
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor:        "pointer",
                  display:       "flex",
                  alignItems:    "center",
                  gap:           8,
                  flexShrink:    0,
                }}
              >
                <span>🎮</span> Buscar
              </button>
            </div>
          </section>

          {/* Top 10 carousel */}
          <section style={{ padding:"40px 0", borderBottom:"1px solid #1a1a1a" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:4 }}>
                  TOP 10 ESTA SEMANA
                </p>
                <h2 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:32, letterSpacing:"0.06em", color:"#F0EDE8" }}>
                  RIVALS DESTACADOS
                </h2>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button
                  onClick={() => setCarouselIdx((i) => (i - 1 + TOP_10.length) % TOP_10.length)}
                  style={{ width:36, height:36, background:"#111", border:"1px solid #222", color:"#F0EDE8", cursor:"pointer", fontSize:16, fontFamily:"monospace" }}
                >‹</button>
                <button
                  onClick={() => setCarouselIdx((i) => (i + 1) % TOP_10.length)}
                  style={{ width:36, height:36, background:"#111", border:"1px solid #222", color:"#F0EDE8", cursor:"pointer", fontSize:16, fontFamily:"monospace" }}
                >›</button>
              </div>
            </div>

            <div style={{ display:"flex", gap:8, overflow:"hidden" }}>
              {TOP_10.map((rival, i) => {
                const isCenter = i === carouselIdx;
                return (
                  <div
                    key={rival.username}
                    onClick={() => setCarouselIdx(i)}
                    style={{
                      flex:       isCenter ? "0 0 200px" : "0 0 110px",
                      background: isCenter ? "#1a0404" : "#111",
                      border:     `1px solid ${isCenter ? "#FF2D2D" : "#1a1a1a"}`,
                      padding:    isCenter ? "20px 14px" : "12px 8px",
                      cursor:     "pointer",
                      transition: "all 0.3s ease",
                      opacity:    isCenter ? 1 : 0.55,
                      textAlign:  "center",
                      overflow:   "hidden",
                    }}
                  >
                    <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize: isCenter ? 13 : 11, color: i === 0 ? "#efb810" : "#6B6460", letterSpacing:"0.1em", marginBottom:6 }}>
                      #{i + 1}
                    </div>
                    <div style={{ fontSize: isCenter ? 36 : 22, marginBottom:6 }}>
                      {getEmoji(rival.username)}
                    </div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize: isCenter ? 15 : 11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#F0EDE8", marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {rival.displayName}
                    </div>
                    {isCenter && (
                      <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:12, color:"#6B6460" }}>
                        {rival.games[0]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Filters */}
          <section style={{ padding:"28px 0 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {GAMES_FILTER.map((g) => (
                <button
                  key={g}
                  onClick={() => setGameFilter(g)}
                  style={{
                    padding:       "7px 16px",
                    background:    gameFilter === g ? "#FF2D2D" : "#111",
                    border:        `1px solid ${gameFilter === g ? "#FF2D2D" : "#222"}`,
                    color:         gameFilter === g ? "#fff" : "#6B6460",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontSize:      13,
                    fontWeight:    700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor:        "pointer",
                    transition:    "all 0.15s",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Online toggle */}
            <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <span
                onClick={() => setOnlineOnly((v) => !v)}
                style={{
                  width:        44,
                  height:       24,
                  background:   onlineOnly ? "#FF2D2D" : "#222",
                  borderRadius: 12,
                  position:     "relative",
                  transition:   "background 0.2s",
                  flexShrink:   0,
                  display:      "block",
                }}
              >
                <span style={{
                  position:    "absolute",
                  top:         3,
                  left:        onlineOnly ? 22 : 3,
                  width:       18,
                  height:      18,
                  borderRadius:"50%",
                  background:  "#fff",
                  transition:  "left 0.2s",
                  display:     "block",
                }} />
              </span>
              <span style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#6B6460", userSelect:"none" }}>
                Solo en línea
              </span>
            </label>
          </section>

          {/* Results count */}
          <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:"#6B6460", marginBottom:20 }}>
            {filtered.length} rival{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:2 }}>
              {filtered.map((rival) => (
                <RivalCard key={rival.username} {...rival} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"80px 0", color:"#6B6460", fontFamily:"'Barlow Condensed', sans-serif", fontSize:18, letterSpacing:"0.06em" }}>
              No se encontraron rivals con esos filtros.
            </div>
          )}
        </>
      )}

      {/* ═══ TAB: SERVICIOS ═══ */}
      {activeTab === "servicios" && (
        <>
          <section style={{ padding:"60px 0 40px", borderBottom:"1px solid #1a1a1a" }}>
            <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
              LO QUE PUEDES CONTRATAR
            </p>
            <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(40px,6vw,80px)", letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1, marginBottom:8 }}>
              SERVICIOS <span style={{ color:"#FF2D2D" }}>RIVALES</span>
            </h1>
            <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:17, color:"#6B6460", maxWidth:500 }}>
              Desde partidas ranked hasta coaching personalizado. Paga con tickets.
            </p>
          </section>

          {/* Service sub-tabs */}
          <section style={{ padding:"32px 0 28px", borderBottom:"1px solid #1a1a1a" }}>
            <div style={{ display:"flex", gap:2, background:"rgba(255,255,255,0.03)", border:"1px solid #222", padding:4, borderRadius:4, width:"fit-content" }}>
              {(["gaming","echat","entretenimiento","coaching"] as ServiceTab[]).map((st) => {
                const labels: Record<ServiceTab, string> = {
                  gaming:          "🎮 Gaming",
                  echat:           "💬 E-Chat",
                  entretenimiento: "🎉 Entretenimiento",
                  coaching:        "📚 Coaching",
                };
                return (
                  <button
                    key={st}
                    onClick={() => setServiceTab(st)}
                    style={{
                      padding:       "9px 22px",
                      background:    serviceTab === st ? "#FF2D2D" : "transparent",
                      border:        "none",
                      color:         serviceTab === st ? "#fff" : "#6B6460",
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontSize:      14,
                      fontWeight:    700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor:        "pointer",
                      borderRadius:  2,
                      transition:    "color 0.2s, background 0.2s",
                    }}
                  >
                    {labels[st]}
                  </button>
                );
              })}
            </div>
          </section>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:2, paddingTop:32 }}>
            {SERVICE_CATEGORIES[serviceTab].map((svc) => (
              <div
                key={svc.title}
                className="service-card"
              >
                <div style={{ fontSize:36, marginBottom:16 }}>{svc.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:20, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:"#F0EDE8", marginBottom:8 }}>
                  {svc.title}
                </h3>
                <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:14, color:"#6B6460", marginBottom:20, lineHeight:1.5 }}>
                  {svc.desc}
                </p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:22, color:"#FF2D2D", letterSpacing:"0.04em" }}>
                    {svc.price}
                  </span>
                  <button style={{ padding:"8px 18px", background:"#FF2D2D", border:"none", color:"#fff", fontFamily:"'Barlow Condensed', sans-serif", fontSize:13, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" }}>
                    Contratar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ═══ TAB: COMUNIDAD ═══ */}
      {activeTab === "comunidad" && (
        <>
          <section style={{ padding:"60px 0 40px", borderBottom:"1px solid #1a1a1a" }}>
            <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
              ÚNETE A LA CONVERSACIÓN
            </p>
            <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(40px,6vw,80px)", letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1, marginBottom:8 }}>
              COMUNIDAD <span style={{ color:"#FF2D2D" }}>RIVALS</span>
            </h1>
            <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:17, color:"#6B6460", maxWidth:500 }}>
              Comparte tips, estrategias y experiencias con miles de jugadores.
            </p>
          </section>

          {/* Stats bar */}
          <div style={{ display:"flex", gap:1, margin:"32px 0", flexWrap:"wrap" }}>
            {[
              { value:"12,400+", label:"Rivals Activos"  },
              { value:"98,000+", label:"Sesiones Totales" },
              { value:"4.8",     label:"Rating Promedio" },
              { value:"15+",     label:"Países"          },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{ flex:"1 1 140px", background:"#111", border:"1px solid #1a1a1a", padding:"20px 24px", textAlign:"center" }}
              >
                <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:36, color:"#FF2D2D", letterSpacing:"0.04em" }}>{value}</div>
                <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#6B6460", marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {POSTS.map((post) => (
              <div
                key={post.id}
                className="post-item"
                style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ fontSize:28, flexShrink:0 }}>{post.emoji}</div>
                  <div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:17, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", color:"#F0EDE8", marginBottom:4 }}>
                      {post.title}
                    </div>
                    <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:12, color:"#6B6460" }}>
                      <span style={{ color:"#FF2D2D" }}>@{post.author}</span>&nbsp;·&nbsp;{post.time}
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:20, flexShrink:0 }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:20, color:"#FF2D2D" }}>{post.likes}</div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#6B6460" }}>👍</div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:20, color:"#6B6460" }}>{post.comments}</div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#6B6460" }}>💬</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </main>
  );
}
