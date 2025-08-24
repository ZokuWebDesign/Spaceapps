
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      {/* Background Illustrations */}
      {/* Shooting Star - Top left area */}
      <img
        src="/assets/vectors/shooting-star.svg"
        alt="Shooting star"
        className="absolute top-[10%] left-[-10%] w-[1200px] h-[740px] z-0 opacity-80 animate-shooting-star"
      />
      
      {/* Stars scattered throughout */}
      <img
        src="/assets/vectors/stars.svg"
        alt="Stars"
        className="absolute top-[5%] left-[8%] w-[1100px] h-[850px] z-0 animate-twinkle"
      />
      
      {/* Planet 1 - Small planet upper right */}
      <img
        src="/assets/vectors/planet-1.svg"
        alt="Planet 1"
        className="absolute top-[5%] right-[27%] w-[66px] h-[66px] z-10 animate-spin-slow"
      />
      
      {/* Planet 2 - Medium planet upper left */}
      <img
        src="/assets/vectors/planet-2.svg"
        alt="Planet 2"
        className="absolute top-[23%] left-[5%] w-[164px] h-[164px] z-10 animate-orbit-float"
      />
      
      {/* Planet 3 - Large planet upper right */}
      <img
        src="/assets/vectors/planet-3.svg"
        alt="Planet 3"
        className="absolute top-[18%] right-[1%] w-[300px] h-[300px] z-5 animate-spin-reverse"
      />
      
      {/* Astronaut 1 - Bottom right */}
      <img
        src="/assets/vectors/astronaut-1.svg"
        alt="Astronaut 1"
        className="absolute bottom-[18%] right-[0%] w-[224px] h-[208px] z-30 animate-levitate"
      />
      
      {/* Astronaut 2 - Bottom left */}
      <img
        src="/assets/vectors/astronaut-2.svg"
        alt="Astronaut 2"
        className="absolute bottom-[8%] left-[0%] w-[232px] h-[130px] z-10 animate-levitate-slow"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 relative z-20">
        <div className="flex flex-col items-center pt-[90px]">
          {/* Text Content */}
          <div className="max-w-[717px] w-full text-center space-y-6 mb-8">
            {/* Tag with globe icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-secondary/30 backdrop-blur-sm">
              <img
                className="w-3 h-3"
                src="/assets/icons/globe.svg"
                alt="globo"
              />
              <span className="text-xs font-semibold text-white font-['Signika',sans-serif]">Projetos em 4 países</span>
            </div>

            {/* Gradient subtitle */}
            <h2>
              Como um foguete: do protótipo ao lançamento
            </h2>
            
            {/* Main title */}
            <h1 className="text-white text-center text-transform: uppercase">
              Desenvolvemos seu software<br />para alcançar o espaço
            </h1>

            {/* Description */}
            <div className="max-w-[644px] mx-auto space-y-6">
              <p className="text-white text-center">
                Cada etapa é como um componente de um foguete sendo cuidadosamente montado para a decolagem.
              </p>
              <p className="text-white text-center">
                Do entendimento inicial à entrega final, seguimos um processo estruturado em fases claras e bem definidas.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Button 
              size="base"
              className="text-[20px] font-extrabold"
            >
              FALAR COM O DAVI
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-[1053px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10"></div>
              <img
                src={'https://i.ibb.co/CK32wSpC/hero.webp'}
                alt="Dashboard Preview"
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
