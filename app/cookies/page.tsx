"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Política de Cookies</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">O que são cookies?</h2>
            <p className="text-[#414651] mb-4">
              Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita nosso site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente e fornecer informações aos proprietários do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Como usamos os cookies</h2>
            <p className="text-[#414651] mb-4">
              Utilizamos cookies para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>Entender como você usa nosso site</li>
              <li>Melhorar sua experiência de navegação</li>
              <li>Lembrar suas preferências</li>
              <li>Personalizar o conteúdo e anúncios relevantes para você</li>
              <li>Manter sua sessão ativa enquanto você navega pelo site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Tipos de cookies que utilizamos</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Cookies Essenciais</h3>
                <p className="text-[#414651]">
                  São necessários para o funcionamento básico do site. O site não pode funcionar adequadamente sem estes cookies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Cookies de Desempenho</h3>
                <p className="text-[#414651]">
                  Nos ajudam a entender como os visitantes interagem com o site, coletando e relatando informações anonimamente.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Cookies de Funcionalidade</h3>
                <p className="text-[#414651]">
                  Permitem que o site lembre de escolhas que você faz para fornecer uma experiência mais personalizada.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-primary">Cookies de Marketing</h3>
                <p className="text-[#414651]">
                  São usados para rastrear visitantes em diferentes sites. A intenção é exibir anúncios relevantes e envolventes para usuários individuais.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Como gerenciar cookies</h2>
            <p className="text-[#414651] mb-4">
              Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. Note que desabilitar certos cookies pode afetar a funcionalidade do site.
            </p>
            <p className="text-[#414651] mb-4">
              Para mais informações sobre como gerenciar cookies, visite as páginas de ajuda do seu navegador:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Atualizações na política de cookies</h2>
            <p className="text-[#414651] mb-4">
              Podemos atualizar nossa política de cookies periodicamente. Recomendamos que você verifique esta página regularmente para se manter informado sobre quaisquer mudanças.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contato</h2>
            <p className="text-[#414651] mb-4">
              Se você tiver alguma dúvida sobre nossa política de cookies, entre em contato conosco através do email: <a href={SOCIAL_LINKS.MAIL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">contato@upos.com.br</a>
            </p>
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

export default CookiesPage; 