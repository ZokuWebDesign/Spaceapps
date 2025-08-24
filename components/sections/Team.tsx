"use client";
import { Button } from "../ui/button";

const teamMembers = [
  {
    name: "Davi Mendes",
    position: "CEO",
    image: "/api/placeholder/222/242"
  },
  {
    name: "Gabriel Lennon",
    position: "CTO",
    image: "/api/placeholder/222/242"
  },
  {
    name: "José Thiago C. Araújo",
    position: "PM/SM",
    image: "/api/placeholder/222/242"
  },
  {
    name: "Eliezer Ordonez",
    position: "DEV Bubble",
    image: "/api/placeholder/222/242"
  },
  {
    name: "Juan Pablo",
    position: "Ux/Ui Designer",
    image: "/api/placeholder/222/242"
  },
  {
    name: "Edivan Oliveira",
    position: "DEV Bubble",
    image: "/api/placeholder/222/242"
  },
  {
    name: "Frank William",
    position: "DEV Bubble",
    image: "/api/placeholder/222/242"
  },
  {
    name: "João",
    position: "DEV Fullstack",
    image: "/api/placeholder/222/242"
  }
];

const Team = () => {
  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="max-w-[868px] mx-auto mb-8">
            <h1 className="text-white text-[56px] font-normal leading-[54px] mb-6">
              Nossa tripulação
            </h1>
            <p className="text-white text-[20px] font-normal leading-[24px] mb-12">
              Nós temos os melhores profissionais do mercado para cuidar do seu projeto de ponta a ponta com organização e processos. Queremos ser o seu CTO parceiro!
            </p>
          </div>
          
          {/* CTA Button */}
          <Button size="md" className="w-[282px] h-[48px]">
            QUERO FAZER PARTE
          </Button>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1168px] mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative rounded-[6px] overflow-hidden backdrop-blur-sm w-[258px] h-[328px] mx-auto"
            >
              {/* Member Image */}
              <div className="p-[18px] pb-0">
                <div className="w-[222px] h-[242px] rounded-[6px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="p-[18px] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white text-[18px] font-bold leading-[27px] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/70 text-[14px] font-normal leading-[21px]">
                      {member.position}
                    </p>
                  </div>
                  
                  {/* Icon placeholder */}
                  <div className="w-[24px] h-[24px] flex-shrink-0">
                    <img 
                      src="/api/placeholder/24/24" 
                      alt="Social icon"
                      className="w-full h-full"
                    />
                  </div>
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
