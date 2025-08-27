"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Carrega usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao parsear usuário do localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Atualiza estado para mostrar botão Entrar
    router.push("/login");
  };

  const scrollToEvents = () => {
    const section = document.getElementById("events");
    if (section) {
      const yOffset = -64; // Ajuste para altura do header fixo
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ROLE</span>
            <span className="text-sm text-gray-500 ml-1">VIP</span>
          </Link>

          {/* Links do menu */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={scrollToEvents}
              className="text-gray-700 hover:text-gray-900"
            >
              Eventos
            </button>
            <Link href="/loja" className="text-gray-700 hover:text-gray-900">
              Loja
            </Link>
            <Link href="/anuncie" className="text-gray-700 hover:text-gray-900">
              Anuncie
            </Link>
          </nav>

          {/* Botão Login ou Perfil */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition"
              >
                {/* Ícone de pessoa */}
                <span className="text-lg font-bold">👤</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2 z-50">
                  <Link
                    href="/usuario"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/usuario/tickets"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Meus Tickets
                  </Link>
                  <Link
                    href="/usuario/carrinho"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Carrinho
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="bg-gray-100 text-gray-700 border-gray-300"
            >
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
