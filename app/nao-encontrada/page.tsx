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
      className="relative min-h-screen flex items-center justify-center bg-[#f3f3f3]"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* upOS Logo */}
        <div className="mb-8">
          <img
            src="/assets/logo.svg"
            alt="upOS Logo"
            className="w-40 h-auto mx-auto object-contain"
          />
        </div>
        
        {/* Error Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ops! Página não encontrada</h2>
          <p className="text-[#414651] text-lg mb-8 leading-relaxed">
            A página que você está procurando não existe ou foi movida. 
            <br className="hidden sm:block" />
            Volte para a página inicial e continue navegando pelo upOS.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Button className="w-full sm:w-auto h-11 px-8 rounded-2xl bg-primary hover:bg-primary/90 border border-primary">
              <a
                href="/"
                className="text-white text-base font-bold"
              >
                Voltar para página inicial
              </a>
            </Button>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-[#414651] mb-4">Precisa de ajuda?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20upOS.%20Por%20favor%2C%20podem%20me%20auxiliar%3F&type=phone_number&app_absent=0"
                className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
              >
                Falar com suporte
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a
                href="/#inicio"
                className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
              >
                Conhecer o upOS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
