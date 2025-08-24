"use client";
import { Button } from "../ui/button";

const Contact = () => {
  return (
    <section className="flex flex-col items-center max-w-7xl mx-auto py-20">

        {/* Main content container with gradient background and border */}
        <div 
          className="flex flex-col gap-8 relative w-[998px] pt-[74px] pb-[50px] rounded-[6px] bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm overflow-hidden"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <div className="w-[390px] h-[390px] relative">
                <img 
                  src="/assets/logo/logo-big.svg" 
                  alt="Space Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Title and Description */}
            <div className="max-w-[838px] mx-auto mb-12">
              <h1 className="text-white text-[56px] font-normal leading-[68px] tracking-[2.8px] mb-6">
                Deixe seu Whatsapp
              </h1>
              <p className="text-white text-[20px] font-medium leading-[24px] tracking-[1.6px]">
                Não pode falar agora mas quer lembrar de tirar a sua ideia do papel? Deixe o seu Whatsapp e o melhor horário para o nosso time comercial entrar em contato!
              </p>
            </div>

            {/* Form Row */}
            <div className="flex flex-col md:flex-row gap-4 max-w-[838px] mx-auto items-end">
              {/* WhatsApp Input */}
              <div 
                className="flex-1 h-[64px] rounded-[6px] px-3 flex items-center border border-[#f63e84]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(143, 143, 143, 0.21) 100%)'
                }}
              >
                <input
                  type="tel"
                  placeholder="00 00000-0000"
                  className="w-full bg-transparent text-white text-[20px] placeholder-white outline-none"
                />
              </div>

              {/* Time Input */}
              <div 
                className="w-full md:w-[200px] h-[64px] rounded-[6px] px-3 flex items-center border border-[#f63e84]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(143, 143, 143, 0.21) 100%)'
                }}
              >
                <input
                  type="text"
                  placeholder="Ex.: 17h"
                  className="w-full bg-transparent text-white text-[20px] placeholder-white outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button size="lg" className="w-[245px] h-[62px]">
                ENVIAR
              </Button>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;
