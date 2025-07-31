import { useState, useEffect, useRef, MouseEvent } from "react";
import smile from "@/assets/icons/smile-icon.svg";

const testimonials = [
  {
    quote: "Conectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.\n\nConectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.\nConectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.",
    name: "Marcos Laurentino",
    usageTime: "Usando há 15 dias",
    image: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Conectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.",
    name: "Daniela Mosquera",
    usageTime: "Usando há 63 dias",
    image: "https://plus.unsplash.com/premium_photo-1705018500344-450a9e2d4c56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Conectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.\n\nConectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.",
    name: "Marcos Laurentino",
    usageTime: "Usando há 15 dias",
    image: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Conectou muito fácil com meu Bling,\ne agora tenho todos os custos\nsincronizados com a precificação.",
    name: "Daniela Mosquera",
    usageTime: "Usando há 63 dias",
    image: "https://plus.unsplash.com/premium_photo-1705018500344-450a9e2d4c56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Mesmo com 2500 SKUs ele cuida de me avisar e tem todos os custos visíveis e atualizados!",
    name: "Marcos Laurentino",
    usageTime: "Usando há 15 dias",
    image: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Testimonials = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <>
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <section id="testimonials" className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
          <div className="flex flex-col items-center gap-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
              <div className="w-11 h-11">
                <img src={smile} alt="smile-icon" className="w-[44px] h-[44px]" />
              </div>
              <h2 className="text-[32px] font-bold text-primary leading-10">
                Depoimentos de quem teve a rotina melhorada
              </h2>
              <p className="text-gray-600 text-base">
                Pague do seu jeito e colha o mesmo pacote completo de recursos.
                {" "}
                Se você quer testar sem compromisso, o Plano Mensal é puro "liberdade de cancelamento": use todos os recursos por R$ 99,99/mês e pare quando quiser. Agora, se a ideia é economizar de verdade, o Plano Anual vira o jogo — 20 % de desconto automático, sai por menos de R$ 3 ao dia e você ainda garante preço fixo pelo ano inteiro.
                <br /><br />
                <strong>
                  Escolheu? É ativar e começar a lucrar. E, claro, se mudar de ideia você pode alternar entre mensal e anual a qualquer momento — sem burocracia, sem taxas escondidas.
                </strong>
              </p>
            </div>

            {/* Testimonials Cards */}
            <div 
              ref={containerRef}
              className="w-full overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scrollbar-hide"
              style={{
                scrollbarWidth: 'none',  /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
                WebkitOverflowScrolling: 'touch'
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className="flex gap-4 min-w-max">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-[305px] bg-[#f0f0f0] rounded-2xl overflow-hidden select-none"
                  >
                    <div className="p-2.5 flex flex-col gap-4">
                      <div 
                        className="w-full aspect-[285/256] rounded-[15px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonial.image})` }}
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-[#393939] text-base tracking-[-0.8px] leading-[1.17] min-h-[212px] whitespace-pre-line">
                          {testimonial.quote}
                        </p>
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-[#393939] text-base tracking-[-0.8px] leading-[1.17]">
                            {testimonial.name}
                          </p>
                          <p className="text-[#39393980] text-xs tracking-[-0.6px]">
                            {testimonial.usageTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
