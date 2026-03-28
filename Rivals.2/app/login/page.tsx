"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Email o contraseña incorrectos.");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 440, margin: "80px auto", padding: "0 24px" }}>
        <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
          BIENVENIDO DE VUELTA
        </p>
        <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:56, letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1, marginBottom:32 }}>
          INICIAR <span style={{ color:"#FF2D2D" }}>SESIÓN</span>
        </h1>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <input
            type="text"
            placeholder="Email o usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {error && (
            <p style={{ color:"#FF2D2D", fontFamily:"'Barlow', sans-serif", fontSize:14 }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={btnPrimary}>
            {loading ? "Cargando..." : "Entrar →"}
          </button>
        </form>

        <div style={{ margin:"24px 0", borderTop:"1px solid #222", position:"relative" }}>
          <span style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"var(--bg)", padding:"0 12px", fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, color:"#6B6460", letterSpacing:"0.08em" }}>
            O CONTINÚA CON
          </span>
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => signIn("discord", { callbackUrl: "/" })} style={btnOutline}>
            Discord
          </button>
          <button onClick={() => signIn("google", { callbackUrl: "/" })} style={btnOutline}>
            Google
          </button>
        </div>

        <p style={{ marginTop:24, fontFamily:"'Barlow', sans-serif", fontSize:14, color:"#6B6460", textAlign:"center" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={{ color:"#FF2D2D", textDecoration:"none" }}>
            Regístrate
          </Link>
        </p>
      </main>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  padding:    "14px 16px",
  background: "#111",
  border:     "1px solid #222",
  color:      "#F0EDE8",
  fontFamily: "'Barlow', sans-serif",
  fontSize:   15,
  outline:    "none",
  borderRadius: 2,
};

const btnPrimary: React.CSSProperties = {
  padding:       "14px",
  background:    "#FF2D2D",
  border:        "none",
  color:         "#fff",
  fontFamily:    "'Barlow Condensed', sans-serif",
  fontSize:      16,
  fontWeight:    700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor:        "pointer",
  borderRadius:  2,
};

const btnOutline: React.CSSProperties = {
  flex:          1,
  padding:       "12px",
  background:    "transparent",
  border:        "1px solid #333",
  color:         "#F0EDE8",
  fontFamily:    "'Barlow Condensed', sans-serif",
  fontSize:      15,
  fontWeight:    700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor:        "pointer",
  borderRadius:  2,
};
