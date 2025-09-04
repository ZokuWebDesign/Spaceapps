"use client";

import { SOCIAL_LINKS } from '@/constants/links';
import { useTranslations } from '@/hooks/useTranslations';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="relative">
      {/* Background with glassmorphism */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(139deg, rgba(255, 255, 255, 0.04) -6.39%, rgba(143, 143, 143, 0.02) 112.17%)',
          backdropFilter: 'blur(12.5px)'
        }}
      ></div>
      
      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-12 py-[27px]">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row w-full gap-6 lg:justify-between pt-[79px]">
            {/* Brand and description */}
            <div className="flex flex-col gap-[40px] w-full max-w-[424px]">
              <div className="flex flex-col gap-[14px]">
                <div className="flex items-center">
                  <img 
                    src="/assets/logo/logo-footer.svg" 
                    alt="SpaceApps Logo" 
                    className="w-[180px] h-[58px] mr-3"
                  />
                </div>
                <p className="max-w-md text-white/80 text-base leading-relaxed">
                  {t.footer.description}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                  <a href={SOCIAL_LINKS.LINKEDIN} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/linkedin.svg" alt="LinkedIn" className="w-[44px] h-[44px]" />
                  </a>
                  <a href={SOCIAL_LINKS.INSTAGRAM} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/instagram.svg" alt="Instagram" className="w-[44px] h-[44px]" />
                  </a>
                  {/*
                  <a href={SOCIAL_LINKS.FACEBOOK} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-[44px] h-[44px]" />
                  </a>
                  <a href={SOCIAL_LINKS.YOUTUBE} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/youtube.svg" alt="YouTube" className="w-[44px] h-[44px]" />
                  </a>
                  <a href={SOCIAL_LINKS.TIKTOK} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/tiktok.svg" alt="Tiktok" className="w-[44px] h-[44px]" />
                  </a>
                  */}
              </div>

            </div>

            {/* Social and Legal Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">

              {/* Navigation Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">{t.footer.navigation.title}</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#inicio" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.home}
                    </a>
                  </li>
                  <li>
                    <a href="#sobre" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.about}
                    </a>
                  </li>
                  <li>
                    <a href="#planejamento" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.planning}
                    </a>
                  </li>
                  <li>
                    <a href="#checklist" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.checklist}
                    </a>
                  </li>
                  <li>
                    <a href="#montagem" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.assembly}
                    </a>
                  </li>
                  <li>
                    <a href="#equipe" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.team}
                    </a>
                  </li>
                  <li>
                    <a href="#depoimentos" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.testimonials}
                    </a>
                  </li>
                  <li>
                    <a href="#tripulacao" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.crew}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      {t.footer.navigation.faq}
                    </a>
                  </li>
                </ul>
              </div>
              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">{t.footer.social.title}</h3>
                <div className="space-y-4">
                  <a href={SOCIAL_LINKS.LINKEDIN} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.social.linkedin}
                  </a>
                  <a href={SOCIAL_LINKS.INSTAGRAM} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.social.instagram}
                  </a>
                  {/*
                  <a href={SOCIAL_LINKS.FACEBOOK} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.social.facebook}
                  </a>
                  <a href={SOCIAL_LINKS.YOUTUBE} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.social.youtube}
                  </a>
                  <a href={SOCIAL_LINKS.TIKTOK} className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.social.tiktok}
                  </a>
                  */}
                </div>
              </div>

              {/* Legal Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">{t.footer.legal.title}</h3>
                <div className="space-y-4">
                  <a href="/termos" className="block text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.legal.terms}
                  </a>
                  <a href="/politica" className="block text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    {t.footer.legal.privacy}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="pt-[14px]">
            <p className="text-xl text-white/80 font-medium">
              {t.footer.copyright}
            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
