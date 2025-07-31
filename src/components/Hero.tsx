import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center pt-[90px]">
          {/* Text Content */}
          <div className="max-w-[1149px] w-full text-center space-y-4 mb-5">
            <h1 className="text-[24px] md:text-[38px] leading-[32px] md:leading-[48px] font-extrabold text-white">
              Precifique, controle seus lucros e acompanhe a saúde do seu 
              e-commerce com praticidade e precisão.
            </h1>
            <p className="text-white text-base leading-[24px] max-w-[836px] mx-auto">
              Diga adeus às planilhas confusas, elimine erros manuais e centralize sua precificação e gestão em um só lugar.
              <br />
              De forma simples, automatizada e sem dor de cabeça.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              className="w-[250px] h-11 rounded-2xl bg-white hover:bg-white/90 border border-[#288DF8]"
            >
              <a
                href="#pricing"
                className="w-full text-base text-primary font-bold"
              >
                Quero contratar agora
              </a>
            </Button>
            <Button 
              className="w-[250px] h-11 rounded-2xl bg-primary hover:bg-primary/90 border border-white"
            >
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full text-base text-white font-bold"
              >
                Quero testar 7 dias grátis
              </a>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full">
            <img
              src={'https://i.imgur.com/6ltfd6z.png'} // https://i.imgur.com/IdvVbYk.png
              alt="Dashboard Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
