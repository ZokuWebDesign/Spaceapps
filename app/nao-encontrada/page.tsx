"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathName = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  },);

  return (
    <section
      id="404"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      {/* Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-[25%] right-[15%] w-1 h-1 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[65%] left-[12%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[80%] right-[20%] w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[40%] right-[8%] w-2 h-2 bg-cyan-500 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Planet elements */}
        <div className="absolute top-[20%] right-[25%] w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-500/30 animate-spin-slow"></div>
        <div className="absolute bottom-[30%] left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 animate-spin-reverse"></div>
      </div>

      <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
        {/* SpaceApps Logo */}
        <div className="mb-8">
          <img
            src="/assets/logo/logo-big.svg"
            alt="SpaceApps Logo"
            className="w-40 h-auto mx-auto object-contain"
          />
        </div>
        
        {/* Error Content */}
        <div className="bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm rounded-[20px] p-8 md:p-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ 
            fontFamily: 'Impact, serif',
            background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">Ops! Página não encontrada no espaço</h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            A página que você está procurando não existe ou foi movida para outra galáxia. 
            <br className="hidden sm:block" />
            Volte para a página inicial e continue navegando pelo universo SpaceApps.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Button className="w-full sm:w-auto h-11 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 hover:scale-105 transition-all duration-200">
              <a
                href="/"
                className="text-white text-base font-bold"
              >
                Voltar para página inicial
              </a>
            </Button>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-white/80 mb-4">Precisa de ajuda?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20a%20SpaceApps.%20Por%20favor%2C%20podem%20me%20auxiliar%3F&type=phone_number&app_absent=0"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
              >
                Falar com suporte
              </a>
              <span className="hidden sm:inline text-gray-500">|</span>
              <a
                href="/#inicio"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
              >
                Conhecer a SpaceApps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
