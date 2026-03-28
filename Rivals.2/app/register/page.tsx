"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ username:"", email:"", password:"", confirm:"" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/users", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ username: form.username, email: form.email, password: form.password }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error al registrarse.");
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 440, margin: "80px auto", padding: "0 24px" }}>
        <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
          ÚNETE A LA PLATAFORMA
        </p>
        <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:56, letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1, marginBottom:32 }}>
          CREAR <span style={{ color:"#FF2D2D" }}>CUENTA</span>
        </h1>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <input name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required style={inputStyle} />
          <input name="email"    type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={inputStyle} />
          <input name="confirm"  type="password" placeholder="Confirmar contraseña" value={form.confirm} onChange={handleChange} required style={inputStyle} />

          {error && (
            <p style={{ color:"#FF2D2D", fontFamily:"'Barlow', sans-serif", fontSize:14 }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={btnPrimary}>
            {loading ? "Creando cuenta..." : "Registrarse →"}
          </button>
        </form>

        <p style={{ marginTop:24, fontFamily:"'Barlow', sans-serif", fontSize:14, color:"#6B6460", textAlign:"center" }}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" style={{ color:"#FF2D2D", textDecoration:"none" }}>
            Inicia sesión
          </Link>
        </p>
      </main>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  padding:      "14px 16px",
  background:   "#111",
  border:       "1px solid #222",
  color:        "#F0EDE8",
  fontFamily:   "'Barlow', sans-serif",
  fontSize:     15,
  outline:      "none",
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
