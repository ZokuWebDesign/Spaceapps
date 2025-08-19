

const Hero = () => {
  return (
    <section id="inicio" className="bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center pt-[90px]">
          {/* Text Content */}
          <div className="max-w-[1149px] w-full text-center space-y-4 mb-5">
            <div className="w-[9.5625rem] h-[1.4375rem] px-[14px] py-[6px] flex flex-col justify-center gap-[0.25rem] rounded-[0.77119rem]" style={{ background: 'rgba(158, 37, 239, 0.30)' }}>
              <img
                className="w-[12px] h-[12px]"
                src="/assets/icons/globe.svg"
                alt="globo"
              />
              <h6 className="w-auto">Projetos em 4 países</h6>
            </div>            
            <h1>
              Desenvolvemos seu software<br />para alcançar o espaço
            </h1>
            <p className="text-white text-base leading-[24px] max-w-[836px] mx-auto">
              Diga adeus às planilhas confusas, elimine erros manuais e centralize sua precificação e gestão em um só lugar.
              <br />
              De forma simples, automatizada e sem dor de cabeça.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div 
              className="w-[250px] h-11 rounded-2xl bg-white hover:bg-white/90 border border-[#288DF8]"
            >
              <a
                href="#pricing"
                className="w-full text-base text-primary font-bold"
              >
                Quero contratar agora
              </a>
            </div>
            <div 
              className="w-[250px] h-11 rounded-2xl bg-primary hover:bg-primary/90 border border-white"
            >
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full text-base text-white font-bold"
              >
                Quero testar 7 dias grátis
              </a>
            </div>
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
