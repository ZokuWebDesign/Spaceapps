import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import money from "@/assets/icons/money-icon.svg";

const features = [
  "Suporte via chat em minutos",
  "Precificação automatizada",
  "Dashboard, performance e faturamento",
  "Funciona sem ERP",
  "Integração ERP Bling",
  "Integração Tiny",
  "Integra com Shopee",
  "Integra Mercado Livre",
  "Visão de lucro nos pedidos de venda",
  "Despesas da empresa",
  "Relatório DRE completo",
  "Avisos em tempo real por Whatsapp",
  "Ponto de equilíbrio"
];

const Pricing = () => {
  return (
    <section id="planos" className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center py-[70px] px-4 lg:px-14">
        <div className="text-center max-w-4xl mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex justify-center">
              <img src={money} alt="diamond-icon" className="w-[46px] h-[46px]" />
            </div>
          </div>
          <h2 className="text-[32px] font-bold text-primary mb-4">
            E tudo isso cabe no seu bolso!
          </h2>
          <p className="mb-4">
            Pague do seu jeito e colha o mesmo pacote completo de recursos. Se você quer testar sem compromisso, o Plano Mensal é puro "liberdade de cancelamento": use todos os recursos por R$ 99,99/mês e pare quando quiser. Agora, se a ideia é economizar de verdade, o Plano Anual vira o jogo — 20% de desconto automático, sai por menos de R$ 3 ao dia e você ainda garante preço fixo pelo ano inteiro.
          </p>
          <p className="font-bold">
            Escolheu? É ativar e começar a lucrar. E, claro, se mudar de ideia você pode alternar entre mensal e anual a qualquer momento — sem burocracia, sem taxas escondidas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-[708px]">
          {/* Monthly Plan */}
          <Card className="relative flex flex-col w-full p-6 rounded-[24px] border border-gray-200 bg-[#F3F3F3]">
            <div className="pb-8 pt-2 text-center">
              <p className="text-[#475467] mb-1">Plano</p>
              <h3 className="text-[32px] font-bold text-primary mb-2">Mensal</h3>
              <div className="w-[185px] h-[1px] bg-[#DDDDDD] mb-4 mx-auto" />
              <p className="text-sm text-[#5B5B5B]">
                Ideal para quem precisa de uma precificação precisa e ver a saúde do seu negócio.
              </p>
            </div>

            <div className="mb-16 text-center">
              <h4 className="text-[32px] font-bold text-primary">R$ 99,99/mês</h4>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-full text-[#37AC5C]" />
                  </div>
                  <span className="text-[#475467]">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-[250px] h-11 rounded-2xl bg-primary hover:bg-primary/90">
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full mx-auto text-base text-white font-bold"
              >
                Teste grátis
              </a>
            </Button>
          </Card>

          {/* Annual Plan */}
          <Card className="relative flex flex-col w-full p-6 rounded-[24px] border-0 bg-primary text-white">
            <div className="absolute top-2.5 right-6">
              <span className="px-4 py-1 rounded-xl text-sm border border-white/10 bg-white/10">
                20% de desconto
              </span>
            </div>

            <div className="pb-8 pt-2 text-center">
              <p className="mb-1 text-white">Plano</p>
              <h3 className="text-[32px] text-white font-bold mb-2">Anual</h3>
              <div className="w-[185px] h-[1px] bg-[#284AB8] mb-4 mx-auto" />
              <p className="text-sm text-white">
                Ideal para quem precisa de uma precificação precisa e ver a saúde do seu negócio.
              </p>
            </div>

            <div className="mb-8 text-center">
              <p className="text-sm text-white line-through mb-1">R$ 99,99/mês → R$ 79,99/mês</p>
              <h4 className="text-[32px] text-white font-bold">R$ 959,99/ano</h4>
              <span className="inline-block px-6 py-1 bg-white rounded-lg text-xs text-primary mt-2">
                Economize 3 meses do ano!
              </span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-full text-white" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-[250px] h-11 rounded-2xl bg-white hover:bg-white/90 mx-auto">
              <a
                href="https://allpriceteam.com.br/cadastro"
                className="w-full mx-auto text-base text-primary font-bold"
              >
                Teste grátis
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
