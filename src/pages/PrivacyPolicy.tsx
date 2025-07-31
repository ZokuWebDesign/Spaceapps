import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
      <p className="text-gray-600 mb-6">Última atualização: 18 de julho de 2025</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
          <p className="text-gray-700">
            A AllPrice está comprometida em proteger sua privacidade. 
            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais 
            quando você utiliza nosso site e serviços.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
          <p className="text-gray-700">
            Coletamos informações que você nos fornece diretamente, incluindo:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Nome e informações de contato</li>
            <li>Informações de registro e perfil</li>
            <li>Informações de pagamento</li>
            <li>Comunicações com nossa equipe</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Como Usamos suas Informações</h2>
          <p className="text-gray-700">
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Processar suas transações</li>
            <li>Enviar informações sobre nossos serviços</li>
            <li>Responder suas solicitações</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
          <p className="text-gray-700">
            Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas com:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Prestadores de serviços que nos auxiliam</li>
            <li>Autoridades legais quando exigido por lei</li>
            <li>Parceiros de negócios com seu consentimento</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Seus Direitos</h2>
          <p className="text-gray-700">
            Você tem direito a:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir dados imprecisos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Retirar seu consentimento</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contato</h2>
          <p className="text-gray-700">
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do email: 
            suporte@allprice.app.br
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
