"use client";
import { link } from "fs";
import { useRef, useState, MouseEvent } from "react";
import { Button } from "../ui/button";

const teamMembers = [
  {
    name: "Davi Mendes",
    position: "CEO",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "Gabriel Lennon",
    position: "CTO",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "José Thiago C. Araújo",
    position: "PM/SM",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "Eliezer Ordonez",
    position: "DEV Bubble",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "Juan Pablo",
    position: "Ux/Ui Designer",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/jaypy06/"
  },
  {
    name: "Edivan Oliveira",
    position: "DEV Bubble",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "Frank William",
    position: "DEV Bubble",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  },
  {
    name: "João",
    position: "DEV Fullstack",
    image: "https://i.ibb.co/nqvqWCFP/juan.webp",
    linkedin: "https://www.linkedin.com/in/davimendes/"
  }
];

const Team = () => {
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
      <div className="flex flex-col gap-6 lg:gap-8 max-w-[1280px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:gap-8 text-center max-w-[868px] mx-auto">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-white">
              Nossa tripulação
            </h1>
            <p className="text-white">
              Nós temos os melhores profissionais do mercado para cuidar do seu projeto de ponta a ponta com organização e processos. Queremos ser o seu CTO parceiro!
            </p>
          </div>
          
          {/* CTA Button */}
          <Button size="md" className="w-full lg:w-[282px]">
            QUERO FAZER PARTE
          </Button>
        </div>

        {/* Team Cards Auto-Wrap Layout */}
        <div 
          ref={containerRef}
          className="flex flex-row justify-start lg:justify-center overflow-x-auto md:flex-wrap md:overflow-x-visible gap-4 max-w-[1168px] mx-auto md:cursor-default cursor-grab active:cursor-grabbing scrollbar-hide select-none"
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
