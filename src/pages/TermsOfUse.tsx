import { Separator } from "@/components/ui/separator";

const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
      <p className="text-gray-600 mb-6">Última atualização: 18 de julho de 2025</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p className="text-gray-700">
            Ao acessar e usar o site e os serviços da AllPrice, você concorda em cumprir e estar vinculado a estes 
            Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Descrição dos Serviços</h2>
          <p className="text-gray-700">
            A AllPrice oferece uma plataforma online que permite aos usuários:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Acessar informações sobre preços de produtos</li>
            <li>Comparar preços entre diferentes fornecedores</li>
            <li>Gerenciar listas de produtos</li>
            <li>Receber alertas de preços</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Conta do Usuário</h2>
          <p className="text-gray-700">
            Para utilizar alguns de nossos serviços, você pode precisar criar uma conta. Você é responsável por:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Manter a confidencialidade de sua senha</li>
            <li>Todas as atividades que ocorrem em sua conta</li>
            <li>Fornecer informações precisas e atualizadas</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Uso Aceitável</h2>
          <p className="text-gray-700">
            Ao usar nossos serviços, você concorda em não:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Violar leis ou regulamentos aplicáveis</li>
            <li>Interferir com a segurança do site</li>
            <li>Coletar dados de usuários sem autorização</li>
            <li>Usar o serviço para fins ilegais ou não autorizados</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
          <p className="text-gray-700">
            Todo o conteúdo, recursos e funcionalidades do site são de propriedade da AllPrice e estão 
            protegidos por leis de propriedade intelectual. Você não pode copiar, modificar, distribuir ou 
            criar trabalhos derivados sem nossa autorização prévia por escrito.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
          <p className="text-gray-700">
            A AllPrice não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais 
            ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Modificações dos Termos</h2>
          <p className="text-gray-700">
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
            em vigor imediatamente após sua publicação no site. O uso continuado de nossos serviços após 
            tais alterações constitui sua aceitação dos novos termos.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
          <p className="text-gray-700">
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: 
            suporte@allprice.app.br
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
