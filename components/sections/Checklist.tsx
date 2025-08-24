"use client";
import { useEffect, useRef, useState } from "react";

const checklistPhases = [
  {
    phase: "Fase 1: Pré-lançamento",
    subtitle: "Preparação da missão",
    description: "Onde tudo começa: entender o contexto, montar a tripulação e traçar a rota.\nEntender o problema → 🧩 \"Identificar o asteroide: o que precisa ser resolvido?\"\nDescobrir como resolver → 🧭 \"Planejar a rota da missão: qual o melhor caminho?\"\nFazer pesquisas e descobertas → 🔍 \"Explorar o terreno: o que já existe no universo?\"\nReunir o time para definir rota → 👩‍🚀 \"Montar a tripulação e alinhar o plano de voo\""
  },
  {
    phase: "Fase 2: Design da Nave",
    subtitle: "Construção da solução",
    description: "Hora de esboçar, desenhar e garantir que a nave está pronta pra voar.\nDesenhar as telas do sistema → 🖥 Projetar o painel de controle da nave (UI/UX).\nFazer o entendimento técnico → 🧰 Verificar se os motores funcionam: viabilidade e arquitetura.\nOrganizar o cronograma → 🕓 Montar o cronograma da missão: cada etapa tem seu tempo."
  },
  {
    phase: "Fase 3: Testes de solo",
    subtitle: "Validação antes da decolagem",
    description: "Antes de apertar o botão vermelho, precisamos garantir que tudo está seguro e funcional.\nTestar no mundo real → 🌍 \"Simular a decolagem: testar com usuários reais.\nDocumentar → 📒 \"Registrar o diário de bordo: garantir que todos saibam como navegar."
  },
  {
    phase: "Fase 4: Lançamento",
    subtitle: "Desenvolvimento e monitoramento",
    description: "Contagem regressiva iniciada. Hora de levantar voo!\nIniciar desenvolvimento → ⏱ Acionar os motores principais e levantar voo!\nFazer reuniões regulares → 📡 Check-ins com a base: manter a missão sob controle.\nEntregar e iniciar suporte → 🛬 Pousar com sucesso e manter o sistema operacional no espaço!"
  }
];

const Checklist = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(checklistPhases.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-white text-[56px] font-normal leading-[68px] mb-6 tracking-[2.8px] max-w-[898px] mx-auto">
            Checklist da decolagem
          </h1>
          <p className="text-white text-[20px] font-normal leading-[24px] max-w-[898px] mx-auto">
            Temos processos testados e comprovamos em mais de 50 projetos. E o melhor: você vai acompanhar tudo de forma simples e prática durante todo o desenvolvimento
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {checklistPhases.map((phase, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardRefs.current[index] = el;
              }}
              className={`
                relative bg-gradient-to-br from-white/15 to-white/0 
                rounded-[20px] p-6 min-h-[606px] backdrop-blur-sm
                transition-all duration-1000 transform
                ${visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
                border: '1px solid transparent',
                backgroundImage: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%),
                  linear-gradient(135deg, rgba(224, 37, 206, 0.7) 0%, rgba(255, 255, 255, 0) 50.52%, rgba(189, 36, 230, 0.7) 100%)
                `,
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                {/* Icon placeholder */}
                <div className="w-[62px] h-[62px] bg-[#1f1e50] rounded-[10px] flex-shrink-0 flex items-center justify-center">
                  <img 
                    src={`/api/placeholder/32/32`} 
                    alt={`Phase ${index + 1} icon`}
                    className="w-8 h-8"
                  />
                </div>
                
                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-white text-[22px] font-semibold leading-[33px] mb-1">
                    {phase.phase}
                  </h3>
                  <p className="text-white text-[16px] font-normal leading-[24px]">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="text-white text-[20px] font-normal leading-[24px] whitespace-pre-line">
                {phase.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Checklist;
