"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useTranslations } from '@/hooks/useTranslations';
import { usePathname } from 'next/navigation';
import { WHATSAPP_LINKS } from "@/constants/links";

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const languageRefDesktop = useRef<HTMLDivElement>(null);
  const languageRefMobile = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDirection();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }

      const clickedInsideDesktop = languageRefDesktop.current && languageRefDesktop.current.contains(event.target as Node);
      const clickedInsideMobile = languageRefMobile.current && languageRefMobile.current.contains(event.target as Node);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, isLanguageDropdownOpen]);

  // Get current language flag
  const getCurrentLanguageFlag = () => {
    if (pathname.startsWith('/en-us')) return "/assets/icons/US.svg";
    if (pathname.startsWith('/es-ar')) return "/assets/icons/AR.svg";
    return "/assets/icons/BR.svg"; // Default to Portuguese
  };

  return (
    <>
      <header 
        className={`sticky top-0 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] z-30 transition-transform duration-300 backdrop-blur-md ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 md:px-14 py-[21px]">
            {/* Logo */}
            <div className={`${isMobile ? 'h-[44px] w-[44px]' : 'h-[44px] w-[127px]'}`}>
              <a 
                href="#inicio"
                className="w-full h-full"
              >
                <img
                  src={isMobile ? "/assets/logo/logo.svg" : "/assets/logo/logo-header.svg"}
                  alt="SPACEAPPS Logo"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-[40px]">
              <nav className="flex items-center gap-6">
                <a href="#inicio" className="nav-link">
                  {t.header.navigation.home}
                </a>
                <a href="#quem-faz-parte" className="nav-link">
                  {t.header.navigation.team}
                </a>
                <a href="#sobre-nos" className="nav-link">
                  {t.header.navigation.about}
                </a>
                <a href="#planejamento" className="nav-link">
                  {t.header.navigation.planning}
                </a>
                <a href="#checklist" className="nav-link">
                  {t.header.navigation.checklist}
                </a>
                <a href="#depoimentos" className="nav-link">
                  {t.header.navigation.testimonials}
                </a>
                <a href="#tripulacao" className="nav-link">
                  {t.header.navigation.crew}
                </a>
                <a href="#faqs" className="nav-link">
                  {t.header.navigation.faqs}
                </a>
              </nav>

              {/* Language Selector */}
              <div className="relative" ref={languageRefDesktop}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-6 h-6 flex items-center justify-center rounded-2xl border border-transparent hover:border-[#674DE2] transition-colors"
                >
                  <img src={getCurrentLanguageFlag()} alt="Language Selector" className="w-6 h-6 object-contain" />
                </button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
                    <a
                      href="/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/BR.svg" alt="Português" className="w-4 h-4" />
                      {t.header.language.portuguese}
                    </a>
                    <a
                      href="/en-us/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/en-us/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/US.svg" alt="English" className="w-4 h-4" />
                      {t.header.language.english}
                    </a>
                    <a
                      href="/es-ar/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/es-ar/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/AR.svg" alt="Español" className="w-4 h-4" />
                      {t.header.language.spanish}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-4">
              <Button 
                size="sm"
                className="w-[150px]"
                variant="primary"
              >
                <a
                  href={WHATSAPP_LINKS.CONTACT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center text-sm font-bold text-white font-['Outfit',sans-serif]"
                >
                  {t.header.cta}
                </a>
              </Button>
              

              {/* Language Selector */}
              <div className="relative" ref={languageRefMobile}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-6 h-6 flex items-center justify-center rounded-2xl border border-transparent hover:border-[#674DE2] transition-colors"
                >
                  <img src={getCurrentLanguageFlag()} alt="Language Selector" className="w-6 h-6 object-contain" />
                </button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
                    <a
                      href="/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/BR.svg" alt="Português" className="w-4 h-4" />
                      {t.header.language.portuguese}
                    </a>
                    <a
                      href="/en-us/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/en-us/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/US.svg" alt="English" className="w-4 h-4" />
                      {t.header.language.english}
                    </a>
                    <a
                      href="/es-ar/"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = '/es-ar/'; }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto',sans-serif] font-medium w-full text-left no-underline"
                    >
                      <img src="/assets/icons/AR.svg" alt="Español" className="w-4 h-4" />
                      {t.header.language.spanish}
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center w-6 h-6 text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40"/>
            {/* Menu */}
            <div ref={menuRef} className="fixed top-[88px] left-0 right-0 bottom-4 mx-4 bg-gradient-to-b from-[#363279] to-[#15153d] z-50 px-[6px] py-[12px] shadow-2xl rounded-2xl border border-white/10">
              <div className="flex flex-col">
                {/* Mobile Menu Header */}
                <div className="flex items-center relative mb-6 flex-shrink-0">
                  <div className="absolute right-0">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-6 h-6 text-white hover:text-[#1ee9e6] transition-colors"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="h-[44px] w-[127px] mx-auto">
                    <img
                      src="/assets/logo/logo-header.svg"
                      alt="SPACEAPPS Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Mobile Menu Content - Scrollable */}
                <div className="flex flex-col gap-2.5 mt-2 p-[19px] border-2 border-white/10 rounded-[9px] bg-white/5 overflow-y-auto flex-1">
                  <a
                    href="#inicio"
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.home}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a
                    href="#quem-faz-parte"
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.team}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#sobre-nos" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.about}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#planejamento" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.planning}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#checklist" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.checklist}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#depoimentos" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.testimonials}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#tripulacao" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.crew}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="#faqs" 
                    className="mobile-nav-link"
                  >
                    {t.header.mobileNavigation.faqs}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  {/* Mobile Language Selector 
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-white/70 text-sm mb-2 px-4 font-['Roboto',sans-serif] font-medium">Idioma</div>
                    <div className="flex flex-col gap-2">
                      <a href="/" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-['Roboto',sans-serif] font-medium">
                        <img src="/assets/icons/BR.svg" alt="Português" className="w-5 h-5" />
                        Português
                      </a>
                      <a href="/en-us" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-['Roboto',sans-serif] font-medium">
                        <img src="/assets/icons/US.svg" alt="English" className="w-5 h-5" />
                        English
                      </a>
                      <a href="/es-ar" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors font-['Roboto',sans-serif] font-medium">
                        <img src="/assets/icons/AR.svg" alt="Español" className="w-5 h-5" />
                        Español
                      </a>
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default Header;
