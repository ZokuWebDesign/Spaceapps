import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import link from "@/assets/icons/link-icon.svg";

// Image URLs - Replace these with your Imgur links
const IMAGES = {
  marketplaceCard: "https://i.imgur.com/zAPbcsU.png",
  pricingCard: "https://i.imgur.com/jCXCiNc.png",
  businessCard: "https://i.imgur.com/awGzvFf.png"
};

const ComoFunciona = () => {
  return (
    <section id="comofunciona" className="bg-white py-[67px] pb-[69px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col items-center gap-9 max-w-[1126px] mx-auto">
          {/* Header Content */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-[34px] h-[34px]">
              <img src={link} alt="faq-icon" className="w-[34px] h-[34px]" />
            </div>
            <h2 className="text-[32px] leading-[40px] font-bold text-primary">
              Para quem é o All Price?
            </h2>
            <p className="text-[#5B5B5B] text-base leading-6 max-w-[836px]">
              Seja você um vendedor de marketplace, um empreendedor em busca de praticidade na hora de precificar ou alguém que atua como CPF, MEI ou ME, aqui você encontra uma solução completa. Automatize processos, elimine erros manuais e tenha controle total sobre seus preços, lucros e resultados.
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            className="w-[250px] h-11 rounded-2xl bg-primary hover:bg-primary/90e border border-[#288DF8]">
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full text-base text-white font-bold"
              >
                Quero testar grátis
              </a>
          </Button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            {/* Card 1 - Marketplace */}
            <div className="w-full bg-[#F3F3F3] rounded-3xl overflow-hidden">
              <div className="p-1.5 flex flex-col gap-6">
                <img 
                  src={IMAGES.marketplaceCard} 
                  alt="Marketplace Vendors" 
                  className="w-full rounded-t-[23px] rounded-b-[12px] object-cover"
                />
                <div className="px-4 md:px-[18px] pb-8 md:pb-[99px] space-y-4">
                  <h3 className="text-[#384257] text-xl leading-7 font-bold min-h-[56px]">
                    Vendedores de Marketplace
                  </h3>
                  <div className="space-y-4">
                    <Feature text="Centralizam anúncios de diferentes marketplaces em um só lugar" />
                    <Feature text="Automatizam a precificação com base em margem, comissão e frete" />
                    <Feature text="Visualizam lucro/prejuízo por pedido, anúncio ou canal de venda" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Pricing */}
            <div className="w-full bg-[#F3F3F3] rounded-3xl overflow-hidden">
              <div className="p-1.5 flex flex-col gap-6">
                <img 
                  src={IMAGES.pricingCard} 
                  alt="Pricing Features" 
                  className="w-full rounded-t-[23px] rounded-b-[12px] object-cover"
                />
                <div className="px-4 md:px-[18px] pb-8 md:pb-[99px] space-y-4">
                  <h3 className="text-[#384257] text-xl leading-7 font-bold min-h-[56px]">
                    Quem busca facilidade na precificação
                  </h3>
                  <div className="space-y-4">
                    <Feature text="Automatiza o cálculo de preços com base em custos reais" />
                    <Feature text="Ajusta margens e preços de vários produtos em poucos cliques" />
                    <Feature text="Visualiza custos, impostos e lucro em tempo real" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Business Types */}
            <div className="w-full bg-[#F3F3F3] rounded-3xl overflow-hidden">
              <div className="p-1.5 flex flex-col gap-6">
                <img 
                  src={IMAGES.businessCard} 
                  alt="Business Types" 
                  className="w-full rounded-t-[23px] rounded-b-[12px] object-cover"
                />
                <div className="px-4 md:px-[18px] pb-8 md:pb-[99px] space-y-4">
                  <h3 className="text-[#384257] text-xl leading-7 font-bold min-h-[56px]">
                    Quem vende como CPF, MEI ou ME
                  </h3>
                  <div className="space-y-4">
                    <Feature text="Adapta a precificação e relatórios conforme o tipo de operação" />
                    <Feature text="Dá suporte a qualquer nível de formalização, sem complicação" />
                    <Feature text="Escala com o crescimento da sua empresa — do CPF ao CNPJ" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature component with check icon
const Feature = ({ text }: { text: string }) => (
  <div className="flex items-start min-w-fit gap-3">
    <div className="min-w-[24px] flex-none">
      <CircleCheck className="w-6 h-6 text-[#37AC5C]" strokeWidth={1.5} />
    </div>
    <p className="text-[#475467] text-base leading-6">{text}</p>
  </div>
);

export default ComoFunciona;
