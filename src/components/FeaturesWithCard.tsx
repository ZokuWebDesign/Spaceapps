import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, BarChart3, ClipboardCheck, Flag, LineChart } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import Package from "@/assets/icons/package-icon.svg";

const features = [
  {
    icon: CreditCard,
    title: "Precificação",
    items: [
      "Anúncios em lista com todos os custos",
      "Precificação por margem de contribuição",
      "Edição em massa de margem lucro e preços de venda",
      "Precificação visualizando custos e lucro",
      "Visualize todos os impostos na precificação (personalizável)"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Avisos em tempo real",
    items: [
      "Avisos de lucro/prejuízo em pedidos de venda via WhatsApp",
      "Avisos de lucro/prejuízo anúncios via Whatsapp",
      "Avisos de lucro/prejuízo em pedidos de venda do painel",
      "Avisos de lucro/prejuízo em pedidos de venda no painel"
    ]
  },
  {
    icon: BarChart3,
    title: "Vendas",
    items: [
      "Sem limites de importações de pedidos de venda",
      "Informações de lucro/prejuízo em todos os pedidos",
      "Curva ABC de produtos e anúncios",
      "Relatórios DRE saiba tudo sobre seu mês ou período de vendas (personalizável)"
    ]
  },
  {
    icon: ClipboardCheck,
    title: "Cadastro",
    items: [
      "Cadastro produtos, salve e envie ao ERP",
      "Cadastre anúncios, salve e envie ao canal de vendas visualizando seu lucro"
    ]
  },
  {
    icon: LineChart,
    title: "Saúde e evolução",
    items: [
      "Dashboard completo com informações em tempo real",
      "Ponto de equilíbrio: saiba quanto faturar para se manter no azul",
      "Custos e despesas: acompanhe a evolução de custos fixos e variáveis",
      "Faturamento por canal: acompanhe a evolução de seus canais por período (personalizável)",
      "Registros de despesas: seus custos em um só lugar"
    ]
  }
];

const FeaturesWithCard = () => {
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
    <>
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <section id="features" className="bg-white py-[66px] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
          <div className="flex flex-col gap-[37px]">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex justify-center">
                  <img src={Package} alt="diamond-icon" className="w-[42px] h-[40px]" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-[32px] leading-[40px] font-bold text-primary">
                Funcionalidades que você precisa!
              </h2>
              <p className="text-[#5B5B5B] text-base leading-6 max-w-[836px] mx-auto">
                Com o All Price você precifica de forma inteligente, recebe alertas em tempo real, acompanha vendas, faz cadastros em segundos e monitora a saúde financeira do negócio — sem planilhas, sem retrabalho e sem surpresas no caixa. Explore cada coluna abaixo e descubra como cada funcionalidade foi pensada para aumentar sua margem, cortar custos e simplificar a gestão do dia a dia.
              </p>
            </div>

            {/* Cards Container */}
            <div 
              ref={containerRef}
              className="overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scrollbar-hide"
              style={{
                scrollbarWidth: 'none',  /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
                WebkitOverflowScrolling: 'touch'
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className="flex gap-4 min-w-max">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="w-[310px] bg-white backdrop-blur-[2px] rounded-[13.697px] border border-[#F3F3F3] p-6 flex flex-col gap-6 select-none"
                  >
                    {/* Card Header */}
                    <div className="space-y-1">
                      <feature.icon className="w-6 h-6 text-[#289EFC]" />
                      <h3 
                        className="text-lg font-bold"
                        style={{
                          background: "linear-gradient(187.147deg, #288DF8 35.343%, #289EFC 67.103%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
                      >
                        {feature.title}
                      </h3>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-4 flex-1">
                      {feature.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3 items-start">
                          <Flag className="w-6 h-6 text-[#289EFC] flex-shrink-0" />
                          <p className="text-[#475467] text-base leading-6">{item}</p>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Button 
                      className="w-[230px] h-11 rounded-2xl bg-primary hover:bg-primary/90 border border-[#288DF8] mx-auto">
                      <a
                        href="https://allpriceteam.com.br/cadastro"
                        className="w-full text-base text-white font-bold"
                      >
                        Testar grátis
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesWithCard;
