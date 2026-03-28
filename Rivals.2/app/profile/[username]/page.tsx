import Navbar from "@/components/layout/Navbar";

interface Props {
  params: { username: string };
}

export default function ProfilePage({ params }: Props) {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 48px" }}>
        <p style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B6460", marginBottom:12 }}>
          PERFIL
        </p>
        <h1 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:64, letterSpacing:"0.04em", color:"#F0EDE8", lineHeight:1 }}>
          @<span style={{ color:"#FF2D2D" }}>{params.username}</span>
        </h1>
        <p style={{ marginTop:24, fontFamily:"'Barlow', sans-serif", fontSize:16, color:"#6B6460" }}>
          Página de perfil — próximamente.
        </p>
      </main>
    </>
  );
}
