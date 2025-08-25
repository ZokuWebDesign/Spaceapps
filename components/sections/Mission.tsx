"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from '@/hooks/useTranslations';

const Mission = () => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      className="relative min-h-screen backdrop-blur-sm"
      style={{
        background: 'linear-gradient(139deg, rgba(255, 255, 255, 0.04) -6.39%, rgba(143, 143, 143, 0.02) 112.17%)'
      }}
    >
      <div className="max-w-7xl flex flex-col gap-[40px] items-center mx-auto pt-[40px] pb-[52px]">
        {/* Title Section */}
        <div 
          className={`max-w-4xl flex flex-col gap-6 text-center transition-all duration-300 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-white">
            {t.mission.title}
          </h1>
          <p className="text-white">
            {t.mission.description}
          </p>
        </div>

        {/* Image Section */}
        <div 
          className={`transition-all duration-300 delay-300 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-full">
            <img 
              src="https://i.ibb.co/ns8WjbcY/mission.webp"
              alt="Mission Planning Illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
