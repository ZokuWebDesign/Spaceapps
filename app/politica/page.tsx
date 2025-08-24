"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Política de Privacidade</h1>
        
        <div className="space-y-8">
          <section>
            <p className="text-[#414651] mb-4">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p className="text-[#414651] mb-4">
              A upOS está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos suas informações pessoais ao usar nossa plataforma de gestão empresarial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Informações que Coletamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Informações fornecidas por você</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone</li>
                  <li>Informações da empresa</li>
                  <li>Informações de pagamento</li>
                  <li>Dados de configuração do sistema</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Informações coletadas automaticamente</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e dispositivo</li>
                  <li>Dados de uso do aplicativo</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Como Usamos Suas Informações</h2>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>Fornecer e melhorar nossos serviços de gestão empresarial</li>
              <li>Processar configurações e personalizações do sistema</li>
              <li>Comunicar-nos com você sobre atualizações e suporte</li>
              <li>Enviar notificações importantes sobre sua conta</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Garantir a segurança de nossa plataforma</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Compartilhamento de Informações</h2>
            <p className="text-[#414651] mb-4">
              Compartilhamos suas informações apenas quando necessário e com as seguintes partes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>Parceiros tecnológicos que auxiliam na operação da plataforma</li>
              <li>Prestadores de serviços de infraestrutura e segurança</li>
              <li>Autoridades competentes, quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Segurança dos Dados</h2>
            <p className="text-[#414651] mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Treinamento regular de funcionários em práticas de privacidade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Seus Direitos</h2>
            <p className="text-[#414651] mb-4">
              Você tem direitos sobre seus dados pessoais, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Restringir ou opor-se ao processamento de seus dados</li>
              <li>Receber seus dados em formato portável</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Retenção de Dados</h2>
            <p className="text-[#414651] mb-4">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              ou conforme exigido por lei. Quando os dados não forem mais necessários, eles serão excluídos de forma segura.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Menores de Idade</h2>
            <p className="text-[#414651] mb-4">
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais 
              de menores. Se você acredita que coletamos informações de um menor, entre em contato conosco imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Alterações nesta Política</h2>
            <p className="text-[#414651] mb-4">
              Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas através 
              de um aviso em nosso site ou por e-mail. O uso continuado de nossos serviços após tais alterações constitui 
              sua aceitação da política atualizada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contato</h2>
            <p className="text-[#414651] mb-4">
              Se você tiver dúvidas sobre esta política de privacidade ou quiser exercer seus direitos, entre em contato conosco:
            </p>
            <ul className="list-none space-y-2 text-[#414651]">
              <li>Email: <a href={SOCIAL_LINKS.MAIL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">contato@upos.com.br</a></li>
              <li>Telefone: <a href={SOCIAL_LINKS.NUMBER} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+55 (11) 9999-9999</a></li>
              <li>Endereço: São Paulo, SP - Brasil</li>
            </ul>
          </section>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 