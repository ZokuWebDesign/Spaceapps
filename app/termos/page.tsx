"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/links";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Termos de Uso | upOS</h1>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4 text-[#414651]">
              <strong>Versão:</strong> 1.0<br />
              <strong>Data da última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">TRANSFORMANDO A GESTÃO EMPRESARIAL</h2>
            <p className="mb-4 text-[#414651]">
              O upOS é uma plataforma de gestão empresarial que revoluciona a forma como sua empresa opera. 
              Ao utilizar nossos serviços, você concorda com os termos descritos neste documento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. TERMOS GERAIS DE USO</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.1. Do Objeto</h3>
                <p className="text-[#414651]">
                  O presente termo regula o uso da plataforma upOS, um sistema de gestão empresarial que oferece 
                  soluções integradas para otimização de processos, controle financeiro, gestão de equipes e 
                  automação de tarefas administrativas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.2. Da Elegibilidade</h3>
                <p className="text-[#414651]">
                  O uso do upOS é destinado a empresas, empreendedores e profissionais maiores de 18 anos ou 
                  representantes legais de empresas devidamente constituídas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.3. Do Cadastro e Veracidade</h3>
                <p className="text-[#414651]">
                  O usuário se compromete a fornecer informações empresariais completas, atualizadas e verídicas. 
                  O fornecimento de dados falsos poderá resultar em suspensão ou cancelamento da conta, sem 
                  prejuízo das medidas legais cabíveis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.4. Da Conta e Responsabilidade</h3>
                <p className="text-[#414651]">
                  O usuário é responsável pela segurança de sua conta, incluindo dados de acesso, configurações 
                  do sistema e informações empresariais armazenadas na plataforma.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.5. Dos Serviços Oferecidos</h3>
                <p className="text-[#414651]">
                  O upOS oferece ferramentas de gestão empresarial, incluindo mas não limitado a: controle 
                  financeiro, gestão de projetos, automação de processos, relatórios analíticos e integração 
                  com sistemas terceiros.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">1.6. Das Obrigações do Usuário</h3>
                <p className="text-[#414651] mb-2">O usuário compromete-se a:</p>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Utilizar o upOS de forma responsável e ética</li>
                  <li>Não compartilhar dados de acesso com terceiros não autorizados</li>
                  <li>Manter backup adequado de dados críticos</li>
                  <li>Cumprir com as leis e regulamentações aplicáveis ao seu negócio</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. POLÍTICA DE PAGAMENTO E CANCELAMENTO</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">2.1. Planos de Assinatura</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li><strong>Plano Básico:</strong> Funcionalidades essenciais de gestão</li>
                  <li><strong>Plano Profissional:</strong> Recursos avançados e integrações</li>
                  <li><strong>Plano Enterprise:</strong> Solução completa para grandes empresas</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">2.2. Cancelamento de Assinatura</h3>
                <p className="text-[#414651] mb-2">O cancelamento pode ser solicitado a qualquer momento:</p>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Acesso mantido até o final do período pago</li>
                  <li>Dados exportáveis por até 30 dias após cancelamento</li>
                  <li>Reembolso conforme política de cada plano</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">2.3. Política de Reembolso</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Primeiros 30 dias: reembolso integral</li>
                  <li>Falhas técnicas prolongadas: reembolso proporcional</li>
                  <li>Cancelamento por violação de termos: sem reembolso</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. PROTEÇÃO DE DADOS E PRIVACIDADE</h2>
            <p className="text-[#414651] mb-4">Em conformidade com a LGPD (Lei nº 13.709/2018).</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">3.1. Dados Coletados</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li><strong>Dados empresariais:</strong> CNPJ, razão social, endereço</li>
                  <li><strong>Dados dos usuários:</strong> nome, e-mail, função na empresa</li>
                  <li><strong>Dados operacionais:</strong> configurações, preferências, logs de uso</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">3.2. Segurança dos Dados</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Criptografia end-to-end</li>
                  <li>Backups automáticos e seguros</li>
                  <li>Acesso controlado por permissões</li>
                  <li>Monitoramento 24/7 de segurança</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">3.3. Direitos do Usuário</h3>
                <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
                  <li>Acesso aos dados armazenados</li>
                  <li>Correção de informações incorretas</li>
                  <li>Exportação de dados</li>
                  <li>Exclusão de conta e dados</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. LIMITAÇÕES E RESPONSABILIDADES</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">4.1. Disponibilidade do Serviço</h3>
                <p className="text-[#414651]">
                  Garantimos 99.9% de uptime, exceto em casos de manutenção programada ou força maior.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">4.2. Limitação de Responsabilidade</h3>
                <p className="text-[#414651]">
                  O upOS não se responsabiliza por perdas decorrentes de uso inadequado da plataforma, 
                  decisões empresariais baseadas em dados incorretos inseridos pelo usuário ou falhas 
                  em sistemas terceiros integrados.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">5. ACEITE E VIGÊNCIA</h2>
            <p className="text-[#414651]">
              Ao utilizar o upOS, o usuário declara ter lido, compreendido e aceito integralmente estes 
              termos de uso. Este documento permanece em vigor enquanto o usuário mantiver conta ativa 
              na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">6. CONTATO E SUPORTE</h2>
            <ul className="list-disc list-inside space-y-2 text-[#414651] ml-4">
              <li>E-mail: <a href={SOCIAL_LINKS.MAIL} className="font-semibold text-primary hover:underline">contato@upos.com.br</a></li>
              <li>Suporte técnico disponível 24/7 na plataforma</li>
              <li>Central de ajuda com documentação completa</li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <div className="text-[#414651]">
              <p className="font-bold mb-2">upOS Gestão Empresarial Ltda</p>
              <p>CNPJ: XX.XXX.XXX/0001-XX</p>
              <p>Sede: São Paulo, SP - Brasil</p>
              <p>Versão: 1.0 – Documento vigente a partir de {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
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

export default TermsOfUse;