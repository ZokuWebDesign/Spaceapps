import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logos/logo.svg";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-[#f3f3f3] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 md:px-14 py-[21px]">
            {/* Logo */}
            <div className={`${isMobile ? 'h-6 w-[89px]' : 'h-[34px] w-[126px]'}`}>
              <a 
                href="#inicio"
                className="w-full h-full"
              >
                <img
                  src={logo}
                  alt="AllPrice Logo"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

            {/* Desktop Actions */}
            {!isMobile && (
              <div className="flex items-center gap-4">
                <Button 
                  className="w-[153px] h-11 rounded-2xl bg-primary hover:bg-primary/90 border border-[#288DF8]">
                  <a
                    href="https://allpriceteam.com.br/cadastro"
                    className="w-full text-base text-white font-bold"
                  >
                    Testar grátis
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  className="w-36 h-11 rounded-2xl border-primary hover:bg-primary/10">
                  <a
                    href="https://allpriceteam.com.br/login"
                    className="w-full text-base text-primary font-bold"
                  >
                    Já sou cliente
                  </a>
                </Button>
              </div>
            )}

            {/* Mobile Actions */}
            {isMobile && (
              <div className="flex items-center gap-4">
                <Button 
                  className="h-[34px] px-4 rounded-[12.4px] bg-primary hover:bg-primary/90 border border-[#288DF8]"
                >
                  <a
                    href="https://allpriceteam.com.br/cadastro"
                    className="w-full text-sm text-white font-bold"
                  >
                    Testar grátis
                  </a>
                </Button>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex items-center justify-center w-6 h-6 text-primary"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" /> {/*  bg-black/20 */}
          {/* Menu */}
          <div ref={menuRef} className="fixed top-[88px] left-0 right-0 mx-4 bg-white z-50 px-[6px] py-[12px] shadow-lg rounded-2xl">
            <div className="flex flex-col">
              {/* Mobile Menu Header */}
              <div className="flex items-center relative mb-6">
                <div className="absolute right-0">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-6 h-6 text-[#2F2F2F]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="h-[34px] w-[126px] mx-auto">
                  <img
                    src={logo}
                    alt="AllPrice Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col gap-2.5 mt-2 p-[19px] border-2 border-[#F7F7F7] rounded-[9px]">
                <button className="w-full">
                  <a
                    href="https://allpriceteam.com.br/login"
                    className="flex justify-between items-center w-full h-[53px] px-4 rounded-2xl bg-[#F7F7F7] text-primary font-semibold text-[18.4px]"
                  >
                    Minha conta
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </button>
                <button className="w-full">
                  <a
                    href="https://allpriceteam.com.br/cadastro"
                    className="flex justify-between items-center w-full h-[53px] px-4 rounded-2xl bg-[#F7F7F7] text-primary font-semibold text-[18.4px]"
                  >
                    Cadastrar
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </button>
                <button className="w-full">
                  <a 
                    href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20AllPrice.%20Por%20favor%2C%20podem%20me%20auxiliar%3F&type=phone_number&app_absent=0"
                    className="flex justify-between items-center w-full h-[53px] px-4 rounded-2xl bg-[#F7F7F7] text-primary font-semibold text-[18.4px]"
                  >
                    Falar com suporte
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
