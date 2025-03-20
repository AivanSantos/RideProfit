import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const GDPR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-16 px-4">
        <Link to="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Página Inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Conformidade com o RGPD</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Na RideProfit, estamos empenhados em respeitar e proteger os seus direitos de privacidade em 
            conformidade com o Regulamento Geral de Proteção de Dados (RGPD) da União Europeia.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Os Nossos Compromissos com o RGPD</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processamos os seus dados pessoais de forma legal, justa e transparente</li>
            <li>Recolhemos dados apenas para fins específicos, explícitos e legítimos</li>
            <li>Limitamos a recolha de dados ao que é necessário para os fins declarados</li>
            <li>Garantimos que os dados são precisos e mantidos atualizados</li>
            <li>Armazenamos dados apenas pelo tempo necessário</li>
            <li>Processamos os dados com segurança e proteção adequadas</li>
            <li>Somos responsáveis e podemos demonstrar conformidade com estes princípios</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Base Legal para Processamento</h2>
          <p>
            Processamos os seus dados pessoais com base em uma ou mais das seguintes bases legais:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>O seu consentimento explícito</li>
            <li>A necessidade de cumprir um contrato consigo</li>
            <li>O cumprimento das nossas obrigações legais</li>
            <li>A proteção dos seus interesses vitais ou de outra pessoa</li>
            <li>Os nossos interesses legítimos (quando não prevalecidos pelos seus direitos)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Os Seus Direitos ao Abrigo do RGPD</h2>
          <p>
            Como titular de dados, tem os seguintes direitos:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Direito de acesso:</strong> Pode solicitar informações sobre os seus dados pessoais que processamos</li>
            <li><strong>Direito de retificação:</strong> Pode corrigir informações imprecisas ou incompletas</li>
            <li><strong>Direito ao apagamento:</strong> Pode solicitar a exclusão dos seus dados em determinadas circunstâncias</li>
            <li><strong>Direito à limitação do tratamento:</strong> Pode restringir como usamos os seus dados</li>
            <li><strong>Direito à portabilidade dos dados:</strong> Pode obter e reutilizar os seus dados para os seus próprios fins</li>
            <li><strong>Direito de oposição:</strong> Pode opor-se ao processamento dos seus dados em determinadas circunstâncias</li>
            <li><strong>Direitos relacionados com decisões automatizadas:</strong> Pode contestar decisões baseadas apenas em processamento automatizado</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Como Exercer os Seus Direitos</h2>
          <p>
            Para exercer qualquer um dos seus direitos, pode contactar o nosso Responsável pela Proteção de Dados (DPO) em dpo@rideprofit.pt.
          </p>
          <p>
            Responderemos ao seu pedido no prazo de um mês. Este prazo pode ser prorrogado por mais dois meses, se necessário, tendo em conta a complexidade e o número de pedidos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Transferências Internacionais de Dados</h2>
          <p>
            Se transferirmos os seus dados para fora do Espaço Económico Europeu (EEE), garantimos que são aplicadas salvaguardas adequadas, como:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Transferência para países com decisões de adequação da Comissão Europeia</li>
            <li>Utilização de cláusulas contratuais-tipo aprovadas pela Comissão Europeia</li>
            <li>Adesão a regras empresariais vinculativas aprovadas</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Violações de Dados</h2>
          <p>
            Em caso de violação de dados que possa resultar em risco para os seus direitos e liberdades, notificaremos a autoridade de supervisão competente no prazo de 72 horas.
          </p>
          <p>
            Se a violação representar um elevado risco para os seus direitos e liberdades, também o notificaremos diretamente.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Avaliações de Impacto</h2>
          <p>
            Realizamos avaliações de impacto sobre a proteção de dados (DPIAs) quando novas tecnologias ou processamentos de dados podem resultar em riscos elevados para os seus direitos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contacte o Nosso DPO</h2>
          <p>
            O nosso Responsável pela Proteção de Dados (DPO) pode ser contactado em:
          </p>
          <p>
            Email: dpo@rideprofit.pt<br />
            Endereço: Av. da Liberdade 110, 1269-046 Lisboa, Portugal
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">9. Direito de Reclamação</h2>
          <p>
            Se considerar que o processamento dos seus dados pessoais viola o RGPD, tem o direito de apresentar uma reclamação à Comissão Nacional de Proteção de Dados (CNPD) em Portugal ou à autoridade de supervisão no Estado-Membro da UE onde reside ou trabalha.
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-4">Última atualização: 1 de Junho de 2023</p>
          <Link to="/">
            <Button variant="outline" size="lg">Voltar para Página Inicial</Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-16 bg-white section-padding border-t border-gray-100">
        <div className="container mx-auto text-center">
          <img 
            src="/logo.png" 
            alt="RideProfit Logo" 
            className="h-12 w-auto mx-auto mb-4" 
          />
          <p>&copy; {new Date().getFullYear()} RideProfit. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default GDPR;
