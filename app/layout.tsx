import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Loader from "../components/progress";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; // 🔥 importando o provider

export const metadata: Metadata = {
  title: "ROLE VIP",
  description: "O melhor sistema de ingresso que existe na capital paulista!",
  generator: "Luiz Bello",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
