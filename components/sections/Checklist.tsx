"use client";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { useTranslations } from '@/hooks/useTranslations';

const Checklist = () => {
  const t = useTranslations();
  
  const checklistPhases = [
    {
      phase: t.checklist.phases.phase1.title,
      subtitle: t.checklist.phases.phase1.subtitle,
      description: t.checklist.phases.phase1.description
    },
    {
      phase: t.checklist.phases.phase2.title,
      subtitle: t.checklist.phases.phase2.subtitle,
      description: t.checklist.phases.phase2.description
    },
    {
      phase: t.checklist.phases.phase3.title,
      subtitle: t.checklist.phases.phase3.subtitle,
      description: t.checklist.phases.phase3.description
    },
    {
      phase: t.checklist.phases.phase4.title,
      subtitle: t.checklist.phases.phase4.subtitle,
      description: t.checklist.phases.phase4.description
    }
  ];
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
        <div className="flex flex-col text-center gap-6 max-w-[898px] mx-auto px-4 lg:px-0">
          <h1 className="text-white">
            {t.checklist.title}
          </h1>
          <p className="text-white text-[20px] font-normal leading-[24px]">
            {t.checklist.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div 
          ref={containerRef}
          className="flex flex-row overflow-x-auto gap-4 lg:gap-[30px] px-4 lg:px-[50px] cursor-grab active:cursor-grabbing scrollbar-hide select-none"
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
                flex flex-col min-w-[324px] lg:min-w-[440px] min-h-[560px] lg:min-h-[606px] px-4 lg:px-6 py-6 lg:pt-[40px] lg:pb-8 gap-6 lg:gap-[40px] bg-gradient-to-br from-white/15 to-white/0 border border-tertiary 
                rounded-[20px] backdrop-blur-sm
                transition-all duration-1000 transform
                ${visibleCards[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-start gap-4 lg:gap-[20px]">
                {/* Icon Profile */}
                <img 
                  src="/assets/logo/space-profile.svg"
                  alt="Space Logo"
                  className="w-12 lg:w-[62px] h-12 lg:h-[62px]"
                />
                
                {/* Title */}
                <div className="flex-1 h-full flex flex-col justify-center">
                  <h3 className="text-white leading-[150%] font-['Poppins']">
                    {phase.phase}
                  </h3>
                  <p className="text-white leading-[150%] font-['Poppins'] -mt-[2px]">
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
