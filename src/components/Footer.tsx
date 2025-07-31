import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logos/logo-white.svg";
import linkedIn from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import youtube from "@/assets/icons/youtube.svg";

const Footer = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Main Footer */}
      <div className="w-full bg-gradient-to-br from-[#288DF8] to-[#289EFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-[70px]">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-[42px] sm:gap-8">
            {/* Company Info */}
            <div className="w-full lg:w-[356px]">
              <div className="flex flex-col gap-4 items-center sm:items-start">
                {/* Logo */}
                <div className="w-[156px] h-[43px]">
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
                <div className="text-center sm:text-left">
                  <p className="text-[20px] text-white leading-[34px]">Simplificando tarefas e</p>
                  <p className="text-[20px] text-white leading-[34px]">otimizando processo!</p>
                </div>
                <button className="w-[250px] h-11 bg-white rounded-2xl">
                  <a
                    href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20AllPrice.%20Por%20favor%2C%20podem%20me%20auxiliar%3F&type=phone_number&app_absent=0"
                    className="w-full px-4 py-2.5 text-base font-bold bg-gradient-to-br from-[#288DF8] to-[#289EFC] bg-clip-text text-transparent"
                  >
                    Falar com o suporte
                  </a>
                </button>
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 lg:gap-[53px]">
              {/* Mapa do site */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-[14px] leading-[20px]">Mapa do site</h3>
                <div className="flex flex-col gap-3 text-white text-[14px] leading-[24px] font-semibold">
                  <a href="#inicio">Início</a>
                  <a href="#comofunciona">Para quem é o ALlPrice?</a>
                  <a href="#erp">ERP ou não</a>
                  <a href="#features">Funcionalidades</a>
                  <a href="#ads">Anúncios</a>
                  <a href="#planos">Planos</a>
                  <a href="#testimonials">depoimentos</a>
                  <a href="#faq">FAQs</a>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-[14px] leading-[20px]">Social</h3>
                <div className="flex flex-col gap-3 text-white text-[14px] leading-[24px] font-semibold">
                  <a href="#">Instagram</a>
                  <a href="#">Facebook</a>
                  <a href="#">Whatsapp</a>
                  <a href="#">Youtube</a>
                  <a href="#">Linkedin</a>
                </div>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-[14px] leading-[20px]">Legal</h3>
                <div className="flex flex-col gap-3 text-white text-[14px] leading-[24px] font-semibold">
                  <a href="/termos">Termos de uso</a>
                  <a href="/privacidade">Política de privacidade</a>
                </div>
              </div>

              {/* Atendimento */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-[14px] leading-[20px]">Atendimento</h3>
                <div className="flex flex-col gap-3 text-white text-[14px] leading-[24px] font-semibold">
                  <a href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20o%20AllPrice.%20Por%20favor%2C%20podem%20me%20auxiliar%3F&type=phone_number&app_absent=0">+55 (11) 98970-5048</a>
                  <a href="mailto:suporte@allprice.com">suporte@allprice.app.br</a>
                  <a href="https://api.whatsapp.com/send/?phone=5511989705048&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20as%20oportunidades%20de%20trabalho%20na%20AllPrice.%20Podem%20me%20ajudar%3F&type=phone_number&app_absent=0">Trabalhe conosco</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#F3F3F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-[29px] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#5B5B5B] text-[16px] text-center sm:hidden">
            ® 2025 | All Price<br />CNPJ: 25.222.985/0001-05<br />Todos os direitos reservados.
          </p>
          <p className="text-[#5B5B5B] text-[16px] hidden sm:block">
            ® 2025 | All Price CNPJ: 25.222.985/0001-05 | Todos os direitos reservados.
          </p>
          <div className="flex gap-3">
            <a href="#" className="hover:opacity-80">
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80">
              <img src={youtube} alt="YouTube" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80">
              <img src={linkedIn} alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80">
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
