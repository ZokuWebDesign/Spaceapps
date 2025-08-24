"use client";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Background with space theme and glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0C29] via-[#24243e] to-[#302b63]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      
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
                  A maior plataforma de exploração espacial. Criações únicas e autênticas 
                  para descobertas espaciais. Possibilitado pela tecnologia blockchain.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/linkedin.svg" alt="LinkedIn" className="w-[44px] h-[44px]" />
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/instagram.svg" alt="Instagram" className="w-[44px] h-[44px]" />
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-[44px] h-[44px]" />
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/youtube.svg" alt="YouTube" className="w-[44px] h-[44px]" />
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    <img src="/assets/icons/tiktok.svg" alt="Tiktok" className="w-[44px] h-[44px]" />
                  </a>
              </div>

            </div>

            {/* Social and Legal Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">

              {/* Navigation Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Mapa</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#inicio" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Início
                    </a>
                  </li>
                  <li>
                    <a href="#sobre" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Sobre nós
                    </a>
                  </li>
                  <li>
                    <a href="#planejamento" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Planejamento
                    </a>
                  </li>
                  <li>
                    <a href="#checklist" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Checklist
                    </a>
                  </li>
                  <li>
                    <a href="#montagem" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Montagem
                    </a>
                  </li>
                  <li>
                    <a href="#equipe" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Quem faz parte
                    </a>
                  </li>
                  <li>
                    <a href="#depoimentos" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Depoimentos
                    </a>
                  </li>
                  <li>
                    <a href="#tripulacao" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      Tripulação
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-white/70 text-lg hover:text-cyan-400 transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Social</h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Linkedin
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Youtube
                  </a>
                  <a href="#" className="flex items-center text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Tiktok
                  </a>
                </div>
              </div>

              {/* Legal Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
                <div className="space-y-4">
                  <a href="/termos" className="block text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Termos de uso
                  </a>
                  <a href="/politica" className="block text-white/70 text-lg hover:text-cyan-400 transition-colors">
                    Privacidade
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="pt-[14px]">
            <p className="text-xl text-white/80 font-medium">
              2025 © SpaceApps. Direitos reservados
            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
