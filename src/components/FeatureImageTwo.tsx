import { CheckCircle2 } from "lucide-react";

const IMAGES = {
  tinyLogo: "https://i.imgur.com/dsElLLN.png",
  blingLogo: "https://i.imgur.com/B0QuSQZ.png",
  noErp: "https://i.imgur.com/Hyyk0xo.png"
};

const features = [
  {
    title: "Monitor de margem",
  },
  {
    title: "Alterações de frete nos marketplaces",
  },
  {
    title: "Faturamento",
  },
  {
    title: "Alterações de comissão nos marketplaces",
  }
];

const FeatureImageTwo = () => {
  return (
    <section className="bg-[#f0f0f0] py-10 px-4 md:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[50px] items-center justify-between max-w-[988px] mx-auto">
          {/* Left side - Illustration */}
          <div className="relative w-full max-w-[256px] sm:max-w-[483px] mx-auto">
            <img
              src="https://i.imgur.com/qIqGfbf.png"
              alt="Woman checking WhatsApp notifications"
              className="w-full h-auto"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full max-w-[302px] sm:max-w-none mx-auto">
            <div className="flex flex-col gap-[35px]">
              <div className="space-y-4">
                <h2 className="text-[28px] md:text-[32px] font-bold text-primary tracking-[-1.6px]">
                  Avisos em tempo real
                </h2>
                <p className="text-[#393939] text-base leading-[1.37]">
                  Você não precisa ocupar espaço no seu<br />
                  celular baixando um novo aplicativo!
                </p>

                {/* Features list */}
                <div className="space-y-3 mt-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <span className="text-[#393939] text-base font-medium">
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-primary rounded-2xl w-full md:w-[250px] h-11 border border-[#288DF8] hover:bg-[#1a3ba3] transition-colors">
                <a
                  href="https://allpriceteam.com.br/cadastro"
                  className="w-full text-base text-white font-bold px-4 py-2.5"
                >
                  Quero testar agora!
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImageTwo;