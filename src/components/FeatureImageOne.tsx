import diamond from "@/assets/icons/diamond-icon.svg";

const FeatureImageOne = () => {
  return (
    <section id="ads" className="bg-white relative w-full">
      <div className="flex flex-col items-center">
        <div className="box-border flex flex-col items-center justify-start px-4 sm:px-14 py-0 sm:py-[70px] w-full">
          <div className="flex flex-col gap-8 items-center justify-start max-w-[1126px] w-full">
            {/* Header Content */}
            <div className="flex flex-col gap-4 items-center justify-start w-full">
              <div className="relative w-[38px] h-[38px] text-primary">
                <img src={diamond} alt="diamond-icon" className="w-[38px] h-[38px]" />
              </div>
              <h2 className="font-bold text-2xl sm:text-[32px] leading-[40px] text-primary text-center w-full">
                Precifique seus anúncios em um só lugar
              </h2>
              <p className="text-[#5B5B5B] text-base leading-6 text-center max-w-[1126px]">
                Seja você um vendedor de marketplace, um empreendedor em busca de praticidade na hora de precificar ou alguém que atua como CPF, MEI ou ME, aqui você encontra uma solução completa. Automatize processos, elimine erros manuais e tenha controle total sobre seus preços, lucros e resultados.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-primary rounded-2xl w-[250px] h-11 border border-[#288DF8] hover:bg-[#1e44bb] transition-colors">
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full text-base text-white font-bold px-4 py-2.5"
              >
                Quero testar agora!
              </a>
            </button>

            {/* Dashboard Preview */}
            <div 
              className="w-full h-[320px] sm:h-[500px] lg:h-[840px] rounded-t-2xl shadow-[8px_-11px_22.2px_0px_rgba(0,0,0,0.08)] bg-center bg-contain bg-no-repeat"
              style={{ 
                backgroundImage: `url('https://i.imgur.com/kCSo1AS.png')`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImageOne;
