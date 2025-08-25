"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }}>
      {/* Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-[25%] right-[12%] w-1 h-1 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[65%] left-[10%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[85%] right-[25%] w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[45%] right-[8%] w-2 h-2 bg-cyan-500 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm rounded-[20px] p-8 lg:p-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8" style={{ 
            fontFamily: 'Impact, serif',
            background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            POLÍTICA DE PRIVACIDADE
          </h1>
          
          <div className="space-y-8">
            <section>
              <p className="text-white/80 mb-4">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              <p className="text-white/90 mb-4">
                A SpaceApps está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos suas informações pessoais ao utilizar nossos serviços de desenvolvimento de software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Informações que Coletamos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Informações fornecidas por você</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Nome completo e dados de contato</li>
                    <li>Endereço de e-mail e telefone</li>
                    <li>Informações da empresa (CNPJ, razão social)</li>
                    <li>Especificações e requisitos do projeto</li>
                    <li>Documentos e materiais relacionados ao desenvolvimento</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Informações coletadas automaticamente</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Endereço IP e dados de navegação</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Dados de interação com nosso site</li>
                    <li>Cookies e tecnologias de rastreamento</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Como Usamos Suas Informações
              </h2>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>Desenvolver e entregar soluções de software personalizadas</li>
                <li>Comunicar sobre o progresso e atualizações do projeto</li>
                <li>Processar pagamentos e questões contratuais</li>
                <li>Fornecer suporte técnico durante e após o desenvolvimento</li>
                <li>Melhorar nossos serviços e processos de desenvolvimento</li>
                <li>Garantir a segurança dos projetos e dados</li>
                <li>Cumprir obrigações legais e contratuais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Compartilhamento de Informações
              </h2>
              <p className="text-white/90 mb-4">
                Compartilhamos suas informações apenas quando necessário e com as seguintes partes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>Membros da equipe de desenvolvimento envolvidos no seu projeto</li>
                <li>Prestadores de serviços de infraestrutura e hospedagem</li>
                <li>Parceiros tecnológicos quando necessário para o desenvolvimento</li>
                <li>Autoridades competentes, quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Segurança dos Dados
              </h2>
              <p className="text-white/90 mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>Criptografia de dados sensíveis</li>
                <li>Controles de acesso rigorosos</li>
                <li>Backups seguros e regulares</li>
                <li>Monitoramento de segurança contínuo</li>
                <li>Treinamento da equipe em práticas de privacidade</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Seus Direitos
              </h2>
              <p className="text-white/90 mb-4">
                Você tem direitos sobre seus dados pessoais, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Restringir ou opor-se ao processamento</li>
                <li>Receber seus dados em formato portável</li>
                <li>Retirar seu consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Retenção de Dados
              </h2>
              <p className="text-white/90 mb-4">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
                ou conforme exigido por lei. Para projetos de desenvolvimento, mantemos documentação do projeto conforme necessário 
                para suporte e manutenção futura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Menores de Idade
              </h2>
              <p className="text-white/90 mb-4">
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais 
                de menores. Se você acredita que coletamos informações de um menor, entre em contato conosco imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Alterações nesta Política
              </h2>
              <p className="text-white/90 mb-4">
                Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas através 
                de um aviso em nosso site ou por e-mail. O uso continuado de nossos serviços após tais alterações constitui 
                sua aceitação da política atualizada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Contato
              </h2>
              <p className="text-white/90 mb-4">
                Se você tiver dúvidas sobre esta política de privacidade ou quiser exercer seus direitos, entre em contato conosco:
              </p>
              <ul className="list-none space-y-2 text-white/90">
                <li>Email: <a href={SOCIAL_LINKS.MAIL} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">suporte@spaceapps.com.br</a></li>
                <li>WhatsApp: Entre em contato através do nosso site</li>
                <li>Endereço: Brasil</li>
              </ul>
            </section>
          </div>

          <div className="mt-8">
            <Button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-xl px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
            >
              Voltar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 