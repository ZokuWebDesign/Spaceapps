"use client";
import { useEffect, useRef, useState, MouseEvent } from "react";

const checklistPhases = [
  {
    phase: "Fase 1: Pré-lançamento",
    subtitle: "Preparação da missão",
    description: 'Onde tudo começa: entender o contexto, montar a tripulação e traçar a rota.\n\n1. Entender o problema →\n🧩 "Identificar o asteroide: o que precisa ser resolvido?"\n\n2. Descobrir como resolver →\n🧭 "Planejar a rota da missão: qual o melhor caminho?"\n\n3. Fazer pesquisas e descobertas →\n🔍 "Explorar o terreno: o que já existe no universo?"\n\n4. Reunir o time para definir rota →\n👩‍🚀 "Montar a tripulação e alinhar o plano de voo"'
  },
  {
    phase: "Fase 2: Design da Nave",
    subtitle: "Construção da solução",
    description: "Hora de esboçar, desenhar e garantir que a nave está pronta pra voar.\n\n1. Desenhar as telas do sistema →\n💻 Projetar o painel de controle da nave (UI/UX).\n\n2. Fazer o entendimento técnico →\n🧰 Verificar se os motores funcionam: viabilidade e arquitetura.\n\n3. Organizar o cronograma →\n🕓 Montar o cronograma da missão: cada etapa tem seu tempo."
  },
  {
    phase: "Fase 3: Testes de solo",
    subtitle: "Validação antes da decolagem",
    description: 'Antes de apertar o botão vermelho, precisamos garantir que tudo está seguro e funcional.\n\n1. Testar no mundo real →\n🌍 "Simular a decolagem: testar com usuários reais.\n\n2. Documentar →\n📒 "Registrar o diário de bordo: garantir que todos saibam como navegar.'
  },
  {
    phase: "Fase 4: Lançamento",
    subtitle: "Desenvolvimento e monitoramento",
    description: "Contagem regressiva iniciada. Hora de levantar voo!\n\n1. Iniciar desenvolvimento →\n🕓 Acionar os motores principais e levantar voo!\n\n2. Fazer reuniões regulares →\n📡 Check-ins com a base: manter a missão sob controle.\n\n3. Entregar e iniciar suporte →\n🛬 Pousar com sucesso e manter o sistema operacional no espaço!"
  }
];

const Checklist = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(checklistPhases.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            // Animate cards in sequence when section comes into view
            checklistPhases.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20"
    >
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex flex-col text-center gap-6 max-w-[898px] mx-auto">
          <h1 className="text-white text-[56px] font-normal leading-[68px] tracking-[2.8px]">
            Checklist da decolagem
          </h1>
          <p className="text-white text-[20px] font-normal leading-[24px]">
            Temos processos testados e comprovamos em mais de 50 projetos. E o melhor: você vai acompanhar tudo de forma simples e prática durante todo o desenvolvimento
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={containerRef}
          className="flex flex-row overflow-x-auto gap-[30px] px-[50px] cursor-grab active:cursor-grabbing scrollbar-hide select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {checklistPhases.map((phase, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardRefs.current[index] = el;
              }}
              className={`
                flex flex-col min-w-[440px] min-h-[606px] px-6 pt-[40px] pb-8 gap-[40px] bg-gradient-to-br from-white/15 to-white/0 border border-tertiary 
                rounded-[20px] backdrop-blur-sm
                transition-all duration-1000 transform
                ${visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-start gap-[20px]">
                {/* Icon Profile */}
                <img 
                  src="/assets/logo/space-profile.svg"
                  alt="Space Logo"
                  className="w-[62px] h-[62px]"
                />
                
                {/* Title */}
                <div className="flex-1 h-full flex flex-col justify-center">
                  <h3 className="text-white text-[22px] leading-[150%] font-['Poppins']">
                    {phase.phase}
                  </h3>
                  <p className="text-white text-[16px] leading-[150%] font-['Poppins'] -mt-[2px]">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white font-['Roboto'] whitespace-pre-line">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Checklist;
