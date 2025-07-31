import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faq from "@/assets/icons/faq-icon.svg";

const faqs = [
  {
    question: "1. Para quem, exatamente, é o All Price?",
    answer: "Para todo mundo que vende on-line — do CPF que anuncia do sofá aos grandes lojistas com CNPJ parrudo. Serve para marketplaces, e-commerce próprio, MEIs, MEs… se você precisa precificar, controlar margens e parar de sofrer com planilhas, é aqui mesmo."
  },
  {
    question: "2. Preciso ter um ERP para usar?",
    answer: "Não, você não precisa ter um ERP para usar o All Price. Nossa plataforma foi desenvolvida para funcionar de forma independente, permitindo que você gerencie seus preços e margens mesmo sem um sistema ERP."
  },
  {
    question: "3. Quais marketplaces e ERPs o All Price integra?",
    answer: "Integramos com os principais marketplaces do Brasil e diversos sistemas ERP. Entre os marketplaces, temos Mercado Livre, Amazon, Shopee, e outros. Para ERPs, oferecemos integração com sistemas populares do mercado."
  },
  {
    question: "4. Como o sistema calcula o preço de venda?",
    answer: "O sistema utiliza algoritmos avançados que consideram diversos fatores como custos, margens, impostos e taxas dos marketplaces para calcular o preço ideal de venda, garantindo sua lucratividade."
  },
  {
    question: "5. Dá pra atualizar centenas de anúncios de uma só vez?",
    answer: "Sim! Com o All Price, você pode atualizar múltiplos anúncios simultaneamente, economizando tempo e garantindo consistência nos seus preços em todas as plataformas."
  },
  {
    question: "6. Recebo alertas de lucro ou prejuízo?",
    answer: "Sim, nossa plataforma monitora constantemente suas margens e envia alertas em tempo real quando detecta situações de risco ou oportunidades de otimização."
  },
  {
    question: "7. Há limite de pedidos ou anúncios que posso importar?",
    answer: "Não há limite técnico para importação. O número de pedidos e anúncios que você pode gerenciar depende do plano contratado."
  },
  {
    question: "8. E a parte de relatórios?",
    answer: "Oferecemos relatórios detalhados e personalizáveis que mostram o desempenho das suas vendas, margens, produtos mais rentáveis e outras métricas importantes para seu negócio."
  },
  {
    question: "9. Quanto custa?",
    answer: "Temos diferentes planos para atender às necessidades de cada tipo de negócio. Entre em contato conosco para conhecer as opções e escolher a mais adequada para você."
  },
  {
    question: "10. Posso testar antes de pagar?",
    answer: "Sim! Oferecemos um período de teste gratuito para você conhecer todas as funcionalidades da plataforma sem compromisso."
  },
  {
    question: "11. Como funciona o suporte e onboarding?",
    answer: "Fornecemos suporte completo durante todo o processo, desde o onboarding até o uso diário da plataforma. Nossa equipe está disponível para ajudar com qualquer dúvida ou necessidade."
  },
  {
    question: "12. Meus dados ficam seguros?",
    answer: "Sim, a segurança dos seus dados é nossa prioridade. Utilizamos as mais avançadas tecnologias de criptografia e seguimos rigorosos protocolos de segurança e LGPD."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-white px-4 sm:px-14 lg:px-[95px] pt-[70px] pb-[80px] sm:pb-[90px]">
      <div className="max-w-[1090px] mx-auto">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <div className="flex justify-center mb-4">
            <img src={faq} alt="faq-icon" className="w-[34px] h-[34px]" />
          </div>
          <h2 className="text-[32px] font-bold text-primary mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-[#5B5B5B] text-base">
            Aqui você encontra respostas para algumas das perguntas mais comuns sobre nossos serviços e soluções.
            <br />
            Se ainda tiver alguma dúvida ou precisar de informações adicionais, entre em contato com os(a) nossos(as) especialistas no suporte
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl px-6 py-0"
            >
              <AccordionTrigger className="py-5 text-[#545353] hover:no-underline">
                <span className="text-left text-xl font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#5B5B5B]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
};

export default FAQ;
