import type { Metadata } from "next";
import Header from "@/Components/header/Header"
import Footer from "@/Components/footer/Footer"

export const metadata: Metadata = {
  title: "Rivals.gg — Gaming Platform"
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
    >
      <head>
        <link rel="stylesheet" href="/CSS/styles.css" />
        <link rel="stylesheet" href="/CSS/texts.css" />
        <link rel="stylesheet" href="/CSS/buttons.css" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Header/>
          <main>
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}

export default RootLayout;