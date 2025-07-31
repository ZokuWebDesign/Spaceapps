import { useEffect, useRef, useState } from "react";

const IMAGES = {
  tinyLogo: "https://i.imgur.com/dsElLLN.png",
  blingLogo: "https://i.imgur.com/B0QuSQZ.png",
  noErp: "https://i.imgur.com/Hyyk0xo.png"
};

const FeaturesWithImage = () => {
  return (
    <section id="erp" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-14">
        <div className="bg-[#F3F3F3] sm:rounded-3xl">
          <div className="p-4 sm:p-12 flex flex-col gap-9">
            {/* Header */}
            <div className="text-center space-y-4">
              <h2 className="text-[32px] leading-[40px] font-bold text-primary">
                Para quem usa e para quem não usa ERP
              </h2>
              <p className="text-[#5B5B5B] text-base leading-6">
                Se você já usa um sistema como Bling, Tiny ou Olist, a integração é fluida: sincronizamos anúncios, produtos e vendas com poucos cliques. Agora, se você ainda não usa ERP, tudo bem também! Você pode operar 100% com o All Price!
              </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[30px]">
              {/* Images Column */}
              <div className="flex flex-col gap-4 w-full">
                <img 
                  src={IMAGES.tinyLogo} 
                  alt="Tiny by Olist" 
                  className="w-full rounded-2xl object-cover"
                />
                <img 
                  src={IMAGES.blingLogo} 
                  alt="Bling" 
                  className="w-full rounded-2xl object-cover"
                />
                <img 
                  src={IMAGES.noErp} 
                  alt="No ERP Required" 
                  className="w-full rounded-2xl object-cover"
                />
              </div>

              {/* Text Column */}
              <div className="w-full text-[#5B5B5B] space-y-6">
                <p className="leading-6">
                  Enquanto muitos sistemas obrigam o uso de um ERP para funcionar direito, o All Price entrega controle total com ou sem ele.
                </p>
                <p className="leading-6">
                  Outros softwares atuam como "extensões" dos ERPs — se você não tiver um, fica sem base de dados ou integração com marketplaces. O All Price inverte essa lógica: ele é completo por si só. Você consegue cadastrar, precificar, acompanhar vendas e visualizar relatórios financeiros mesmo sem nenhuma ferramenta externa.
                </p>
                <p className="leading-6">
                  Para quem já usa ERP, o All Price amplia o que você já tem: conecta, cruza dados e oferece relatórios financeiros e margens de lucro que muitos ERPs não entregam de forma clara.
                </p>
                <p className="leading-6">
                  Para quem não usa, ele já resolve tudo o que você precisa, evitando o custo e a curva de aprendizado de sistemas complexos.
                </p>

                <ul className="list-disc pl-6 space-y-6">
                  <li>Sincronização automática de anúncios, estoque e pedidos – adeus digitação dupla e retrabalho.</li>
                  <li>Operação 100% autônoma sem ERP – cadastre produtos, precifique e controle vendas direto no All Price.</li>
                  <li>Relatórios financeiros completos (DRE, margem, ponto de equilíbrio) mesmo se você não tiver ERP.</li>
                  <li>Atualização em massa de preços e margens – ajuste portfólio inteiro em poucos cliques.</li>
                  <li>Alertas de lucro/prejuízo em tempo real via painel ou WhatsApp – saiba quando agir antes que o caixa sangre.</li>
                  <li>Eliminação de erros manuais – regras claras de impostos, comissões e frete aplicadas de forma padronizada.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesWithImage;
