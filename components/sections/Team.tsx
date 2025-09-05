"use client";
import { link } from "fs";
import { useRef, useState, MouseEvent } from "react";
import { Button } from "../ui/button";
import { useTranslations } from '@/hooks/useTranslations';
import { WHATSAPP_LINKS } from "@/constants/links";

const teamMembers = [
  {
    name: "Davi Mendes",
    position: "CEO",
    image: "https://i.ibb.co/Y4KGhF3C/davi.webp",
    linkedin: "https://www.linkedin.com/in/davi-mendes-36888323b/"
  },
  {
    name: "Gabriel Lennon",
    position: "CTO",
    image: "https://i.ibb.co/Q7HgBQjk/gabriel.webp",
    linkedin: "https://www.linkedin.com/in/gabriel-lenon-802026217/"
  },
  {
    name: "José Thiago C. Araújo",
    position: "PM/SM",
    image: "https://i.ibb.co/845XKNcS/thiago.webp",
    linkedin: "https://www.linkedin.com/in/josethiagoreal/"
  },
  {
    name: "Eliezer Ordonez",
    position: "DEV Bubble",
    image: "https://i.ibb.co/vGs0Nd5/eliezer.webp",
    linkedin: "https://www.linkedin.com/in/eliezer-ordonez/"
  },
  {
    name: "Juan Pablo",
    position: "Ux/Ui Designer",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/jaypy06/"
  },
  {
    name: "Frank William",
    position: "DEV Bubble",
    image: "https://i.ibb.co/MDmV1dHw/frank.webp",
    linkedin: "https://www.linkedin.com/in/frankwilliam/"
  },
  {
    name: "David Ferreira",
    position: "DEV Full Stack",
    image: "https://i.ibb.co/k20vN0zT/david.webp",
    linkedin: "https://www.linkedin.com/in/davidferreiraspace/"
  },
  {
    name: "João",
    position: "DEV Full Stack",
    image: "https://i.ibb.co/N2Yj9zJ9/placeholder.webp",
    linkedin: "https://www.linkedin.com/in/joaospace/"
  }
];

const Team = () => {
  const t = useTranslations();
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
    <section className="pt-[50px] pb-[97px]">
      <div className="flex flex-col gap-6 lg:gap-8 max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:gap-8 text-center items-center max-w-[868px] mx-auto px-4">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-white">
              {t.team.title}
            </h1>
            <p className="text-white">
              {t.team.description}
            </p>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="md"
            variant="primary"
            className="w-full md:w-[282px]"
          >
            <a
              href={WHATSAPP_LINKS.CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              {t.team.cta}
            </a>
          </Button>
        </div>

        {/* Team Cards Auto-Wrap Layout */}
        <div 
          ref={containerRef}
          className="flex flex-row justify-start md:justify-center md:flex-wrap overflow-x-auto md:overflow-x-visible gap-4 px-4 w-full max-w-[1168px] mx-auto md:cursor-default cursor-grab active:cursor-grabbing scrollbar-hide select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-[6px] p-[18px] rounded-[6px] overflow-hidden backdrop-blur-sm w-[258px] h-[328px] flex-shrink-0 md:flex-shrink"
              style={{ background: "linear-gradient(139deg, rgba(255, 255, 255, 0.13) -6.39%, rgba(255, 255, 255, 0.06) 112.17%)" }}
            >
              {/* Member Image */}
              <div className="">
                <div className="w-[222px] h-[242px] rounded-[6px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h6 className="text-white text-[18px] font-bold leading-[27px] -mb-[4px]">
                      {member.name}
                    </h6>
                    <p className="text-white/70 text-[14px] font-normal leading-[21px]">
                      {member.position}
                    </p>
                  </div>
                  
                  {/* LinkedIn Icon */}
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/linkedin-team.svg"
                      alt="LinkedIn icon"
                      className="w-6 h-6"
                    />
                  </a>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
