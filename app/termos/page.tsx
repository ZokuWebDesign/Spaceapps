"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }}>
      {/* Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-[20%] right-[10%] w-1 h-1 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[80%] right-[20%] w-1 h-1 bg-blue-400 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[40%] right-[5%] w-2 h-2 bg-cyan-500 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
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
            TERMOS DE USO | SPACEAPPS
          </h1>
          
          <div className="space-y-8">
            <section>
              <p className="mb-4 text-white/80">
                <strong>Versão:</strong> 1.0<br />
                <strong>Data da última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
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
                DESENVOLVENDO SOLUÇÕES ESPACIAIS
              </h2>
              <p className="mb-4 text-white/90">
                A SpaceApps é uma plataforma de desenvolvimento de software que revoluciona projetos digitais. 
                Ao utilizar nossos serviços, você concorda com os termos descritos neste documento.
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
                1. TERMOS GERAIS DE USO
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.1. Do Objeto</h3>
                  <p className="text-white/90">
                    O presente termo regula o uso da plataforma SpaceApps, uma empresa de desenvolvimento de 
                    software que oferece soluções inovadoras para transformar ideias em realidade digital 
                    através de tecnologias avançadas e processos estruturados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.2. Da Elegibilidade</h3>
                  <p className="text-white/90">
                    O uso dos serviços da SpaceApps é destinado a empresas, empreendedores e profissionais 
                    maiores de 18 anos ou representantes legais de empresas devidamente constituídas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.3. Do Cadastro e Veracidade</h3>
                  <p className="text-white/90">
                    O cliente se compromete a fornecer informações empresariais completas, atualizadas e verídicas. 
                    O fornecimento de dados falsos poderá resultar em suspensão ou cancelamento do projeto, sem 
                    prejuízo das medidas legais cabíveis.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.4. Da Responsabilidade do Cliente</h3>
                  <p className="text-white/90">
                    O cliente é responsável por fornecer informações precisas sobre o projeto, participar 
                    ativamente do processo de desenvolvimento e aprovar entregas conforme cronograma estabelecido.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.5. Dos Serviços Oferecidos</h3>
                  <p className="text-white/90">
                    A SpaceApps oferece serviços de desenvolvimento de software, incluindo mas não limitado a: 
                    desenvolvimento de aplicações web e mobile, sistemas personalizados, consultoria técnica, 
                    UI/UX design e suporte técnico.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">1.6. Das Obrigações do Cliente</h3>
                  <p className="text-white/90 mb-2">O cliente compromete-se a:</p>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Fornecer informações necessárias para o desenvolvimento do projeto</li>
                    <li>Participar ativamente das reuniões e validações</li>
                    <li>Realizar pagamentos conforme cronograma acordado</li>
                    <li>Respeitar direitos autorais e propriedade intelectual da SpaceApps</li>
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
                2. POLÍTICA DE PAGAMENTO E PROJETO
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">2.1. Modalidades de Projeto</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li><strong>Projeto Básico:</strong> Desenvolvimento de funcionalidades essenciais</li>
                    <li><strong>Projeto Profissional:</strong> Solução completa com recursos avançados</li>
                    <li><strong>Projeto Enterprise:</strong> Desenvolvimento customizado para grandes empresas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">2.2. Alterações no Projeto</h3>
                  <p className="text-white/90 mb-2">Alterações podem ser solicitadas durante o desenvolvimento:</p>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Mudanças menores: sem custo adicional</li>
                    <li>Mudanças significativas: poderão gerar custos adicionais</li>
                    <li>Alterações no escopo: requerem novo acordo</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">2.3. Política de Pagamento</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Entrada: 50% para início do projeto</li>
                    <li>Entrega: 50% na finalização e entrega</li>
                    <li>Projetos longos: parcelamento conforme cronograma</li>
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
                3. PROTEÇÃO DE DADOS E PRIVACIDADE
              </h2>
              <p className="text-white/90 mb-4">Em conformidade com a LGPD (Lei nº 13.709/2018).</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">3.1. Dados Coletados</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li><strong>Dados empresariais:</strong> CNPJ, razão social, endereço</li>
                    <li><strong>Dados dos contatos:</strong> nome, e-mail, telefone</li>
                    <li><strong>Dados do projeto:</strong> especificações, documentos, comunicações</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">3.2. Segurança dos Dados</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Proteção por senhas e criptografia</li>
                    <li>Backups seguros do código fonte</li>
                    <li>Acesso restrito às informações do projeto</li>
                    <li>Confidencialidade total das informações</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">3.3. Direitos do Cliente</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                    <li>Acesso aos dados do projeto</li>
                    <li>Correção de informações incorretas</li>
                    <li>Entrega do código fonte</li>
                    <li>Exclusão de dados pessoais (exceto obrigações legais)</li>
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
                4. LIMITAÇÕES E RESPONSABILIDADES
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">4.1. Entrega do Projeto</h3>
                  <p className="text-white/90">
                    A SpaceApps compromete-se a entregar o projeto conforme especificações acordadas e 
                    cronograma estabelecido, exceto em casos de força maior ou alterações solicitadas pelo cliente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">4.2. Limitação de Responsabilidade</h3>
                  <p className="text-white/90">
                    A SpaceApps não se responsabiliza por perdas decorrentes de uso inadequado do software, 
                    decisões de negócio baseadas no sistema desenvolvido ou problemas em infraestruturas 
                    terceiras não controladas pela empresa.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">4.3. Propriedade Intelectual</h3>
                  <p className="text-white/90">
                    O código fonte desenvolvido pertence ao cliente após quitação integral. A SpaceApps 
                    mantém direitos sobre metodologias, frameworks próprios e conhecimentos técnicos utilizados.
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
                5. ACEITE E VIGÊNCIA
              </h2>
              <p className="text-white/90">
                Ao contratar os serviços da SpaceApps, o cliente declara ter lido, compreendido e aceito 
                integralmente estes termos de uso. Este documento permanece em vigor durante todo o 
                desenvolvimento do projeto e após sua entrega.
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
                6. CONTATO E SUPORTE
              </h2>
              <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                <li>E-mail: <a href={SOCIAL_LINKS.MAIL} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">suporte@spaceapps.com.br</a></li>
                <li>WhatsApp: Entre em contato através do nosso site</li>
                <li>Suporte técnico durante o desenvolvimento do projeto</li>
              </ul>
            </section>

            <section className="border-t border-white/20 pt-8">
              <div className="text-white/80">
                <p className="font-bold mb-2">SpaceApps Desenvolvimento de Software</p>
                <p>CNPJ: XX.XXX.XXX/0001-XX</p>
                <p>Brasil</p>
                <p>Versão: 1.0 – Documento vigente a partir de {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
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

export default TermsOfUse;