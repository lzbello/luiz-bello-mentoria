import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white">
          <div className="mb-4">
            <h1 className="text-6xl font-bold mb-2 text-yellow-400 stroke-text">
              ARENA
            </h1>
            <h2 className="text-4xl font-bold text-yellow-400">ARRAIÁ</h2>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm">Loja</span>
            </div>
            <div className="text-2xl font-bold">15 OUTUBRO</div>
          </div>

          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-script text-lg">Liga</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
