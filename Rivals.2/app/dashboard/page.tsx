import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 48px" }}>
        <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
          PANEL DE CONTROL
        </p>
        <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:64, letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1 }}>
          DASHBOARD <span style={{ color:"#FF2D2D" }}>RIVAL</span>
        </h1>
        <p style={{ marginTop:24, fontFamily:"'Barlow', sans-serif", fontSize:16, color:"#6B6460" }}>
          Bienvenido, {session.user?.name}. Próximamente aquí verás tus sesiones, ingresos y estadísticas.
        </p>
      </main>
    </>
  );
}
