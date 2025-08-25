"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const CookiesPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }}>
      {/* Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="absolute top-[12%] left-[6%] w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] left-[12%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[88%] right-[30%] w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[50%] right-[10%] w-2 h-2 bg-cyan-500 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
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
            POLÍTICA DE COOKIES
          </h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ 
                fontFamily: 'Signika, sans-serif',
                background: 'linear-gradient(to right, #1ee9e6, #26a8f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                O que são cookies?
              </h2>
              <p className="text-white/90 mb-4">
                Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita nosso site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente e fornecer informações para melhorar a experiência do usuário.
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
                Como usamos os cookies
              </h2>
              <p className="text-white/90 mb-4">
                Utilizamos cookies para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>Entender como você usa nosso site</li>
                <li>Melhorar sua experiência de navegação</li>
                <li>Lembrar suas preferências de idioma</li>
                <li>Personalizar o conteúdo relevante para você</li>
                <li>Manter sua sessão ativa enquanto navega</li>
                <li>Analisar o desempenho do site</li>
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
                Tipos de cookies que utilizamos
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Cookies Essenciais</h3>
                  <p className="text-white/90">
                    São necessários para o funcionamento básico do site. O site não pode funcionar adequadamente sem estes cookies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Cookies de Desempenho</h3>
                  <p className="text-white/90">
                    Nos ajudam a entender como os visitantes interagem com o site, coletando e relatando informações anonimamente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Cookies de Funcionalidade</h3>
                  <p className="text-white/90">
                    Permitem que o site lembre de escolhas que você faz para fornecer uma experiência mais personalizada.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-cyan-400">Cookies Analíticos</h3>
                  <p className="text-white/90">
                    São usados para analisar como nosso site é usado, permitindo-nos melhorar constantemente a experiência do usuário.
                  </p>
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
                Como gerenciar cookies
              </h2>
              <p className="text-white/90 mb-4">
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. Note que desabilitar certos cookies pode afetar a funcionalidade do site.
              </p>
              <p className="text-white/90 mb-4">
                Para mais informações sobre como gerenciar cookies, visite as páginas de ajuda do seu navegador:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Safari</a></li>
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
                Atualizações na política de cookies
              </h2>
              <p className="text-white/90 mb-4">
                Podemos atualizar nossa política de cookies periodicamente. Recomendamos que você verifique esta página regularmente para se manter informado sobre quaisquer mudanças.
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
                Se você tiver alguma dúvida sobre nossa política de cookies, entre em contato conosco através do email: <a href={SOCIAL_LINKS.MAIL} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">suporte@spaceapps.com.br</a>
              </p>
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

export default CookiesPage; 