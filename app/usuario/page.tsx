"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UsuarioPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return <div className="p-4">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
        <p className="mb-2">
          <strong>Nome:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <Button
          onClick={() => router.push("/usuario/editar")}
          className="mb-2 w-full"
        >
          Editar Perfil
        </Button>
        <Button
          onClick={() => router.push("/usuario/tickets")}
          className="mb-2 w-full"
        >
          Meus Tickets
        </Button>

        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white hover:bg-red-600 w-full"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
