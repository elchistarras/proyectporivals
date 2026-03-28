"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  activeTab?:   "rivals" | "servicios" | "comunidad";
  onTabChange?: (tab: "rivals" | "servicios" | "comunidad") => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const { data: session } = useSession();
  const showTabs = !!onTabChange;

  return (
    <header
      className="sticky top-0 z-[1000] backdrop-blur-[12px]"
      style={{
        background:   "rgba(11,11,11,0.97)",
        borderBottom: "1px solid #222",
        boxShadow:    "0 2px 20px rgba(255,45,45,0.08)",
      }}
    >
      <nav
        style={{
          maxWidth:       1400,
          margin:         "0 auto",
          padding:        "0 48px",
          height:         68,
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          gap:            32,
        }}
      >
        {/* ── izquierda: logo + tabs ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.1em", color: "#F0EDE8", lineHeight: 1 }}>
              RIVALS<span style={{ color: "#FF2D2D" }}>.GG</span>
            </span>
            <span style={{
              background:    "#FF2D2D",
              color:         "#fff",
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      10,
              fontWeight:    700,
              letterSpacing: "0.2em",
              padding:       "3px 7px",
              borderRadius:  2,
            }}>
              BETA
            </span>
          </Link>

          {showTabs ? (
            <div
              style={{
                display:    "flex",
                gap:        2,
                background: "rgba(255,255,255,0.03)",
                border:     "1px solid #222",
                padding:    4,
                borderRadius: 4,
              }}
            >
              {(
                [
                  { id: "rivals",    label: "Encuentra Rivals" },
                  { id: "servicios", label: "Servicios"         },
                  { id: "comunidad", label: "Comunidad"         },
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange!(tab.id)}
                    style={{
                      padding:       "9px 22px",
                      background:    isActive ? "#FF2D2D" : "transparent",
                      border:        "none",
                      color:         isActive ? "#fff"    : "#6B6460",
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      fontSize:      15,
                      fontWeight:    700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor:        "pointer",
                      borderRadius:  2,
                      transition:    "color 0.2s, background 0.2s",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 2 }}>
              {[
                { href: "/",               label: "Encuentra Rivals" },
                { href: "/?tab=servicios", label: "Servicios"        },
                { href: "/?tab=comunidad", label: "Comunidad"        },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding:        "9px 22px",
                    fontFamily:     "'Barlow Condensed', sans-serif",
                    fontSize:       15,
                    fontWeight:     700,
                    letterSpacing:  "0.08em",
                    textTransform:  "uppercase",
                    color:          "#6B6460",
                    textDecoration: "none",
                    borderRadius:   2,
                    transition:     "color 0.2s",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── derecha: auth ── */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {session ? (
            <>
              <Link
                href={`/profile/${session.user?.name}`}
                style={{
                  padding:        "9px 22px",
                  background:     "transparent",
                  border:         "1px solid #333",
                  color:          "#F0EDE8",
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontSize:       15,
                  fontWeight:     700,
                  letterSpacing:  "0.08em",
                  textTransform:  "uppercase",
                  borderRadius:   2,
                  textDecoration: "none",
                }}
              >
                {session.user?.name}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  padding:       "9px 22px",
                  background:    "#FF2D2D",
                  border:        "none",
                  color:         "#fff",
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      15,
                  fontWeight:    700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor:        "pointer",
                  borderRadius:  2,
                }}
              >
                Salir →
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  padding:        "9px 22px",
                  background:     "transparent",
                  border:         "1px solid #333",
                  color:          "#F0EDE8",
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontSize:       15,
                  fontWeight:     700,
                  letterSpacing:  "0.08em",
                  textTransform:  "uppercase",
                  borderRadius:   2,
                  textDecoration: "none",
                }}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                style={{
                  padding:        "9px 22px",
                  background:     "#FF2D2D",
                  border:         "none",
                  color:          "#fff",
                  fontFamily:     "'Barlow Condensed', sans-serif",
                  fontSize:       15,
                  fontWeight:     700,
                  letterSpacing:  "0.08em",
                  textTransform:  "uppercase",
                  borderRadius:   2,
                  textDecoration: "none",
                  display:        "inline-block",
                }}
              >
                Ser un Rival →
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
