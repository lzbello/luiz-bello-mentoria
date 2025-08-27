"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [showCookiesBanner, setShowCookiesBanner] = useState(true);

  const handleAcceptCookies = () => {
    setShowCookiesBanner(false);
    // Se quiser salvar no localStorage para não mostrar de novo
    localStorage.setItem("cookiesAccepted", "true");
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {showCookiesBanner && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm">
                <p>
                  A ROLE VIP utiliza cookies que são necessários ao
                  funcionamento adequado de suas Páginas. Também, a ROLE VIP
                  poderá utilizar cookies para melhorar a sua experiência,
                  permitir o início de sessão seguro, memorizar os detalhes de
                  seu início de sessão, gerir a sessão, recolher estatísticas,
                  as funcionalidades das Páginas e oferecer conteúdo adequado
                  aos seus interesses. Para mais informações acesse as{" "}
                  <a href="#" className="text-orange-500 hover:underline">
                    Políticas de Cookies
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-orange-500 hover:underline">
                    Termos e Políticas
                  </a>
                  .
                </p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white ml-4 whitespace-nowrap"
                onClick={handleAcceptCookies}
              >
                ✓ Aceitar Cookies
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">ROLE VIP</span>
            </div>
            <p className="text-gray-400 text-sm">
              Sua plataforma confiável para venda de ingressos dos principais
              eventos da sua cidade. Siga-nos nas redes sociais, explore nossas
              FAQs ou entre em contato para mais informações. Todos os direitos
              reservados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Eventos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Encontrar Eventos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Criar Evento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Vender Ingressos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Imprensa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 ROLE VIP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
