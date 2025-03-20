import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-16 px-4">
        <Link to="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Página Inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Na RideProfit, valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. 
            Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as suas informações.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Dados que Recolhemos</h2>
          <p>
            Podemos recolher os seguintes tipos de informação:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Informações de identificação pessoal (nome, email, etc.)</li>
            <li>Dados financeiros que introduz voluntariamente na aplicação</li>
            <li>Informações técnicas sobre o seu dispositivo e como interage com a nossa aplicação</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Como Utilizamos os Seus Dados</h2>
          <p>
            Utilizamos os seus dados para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Fornecer, operar e manter os nossos serviços</li>
            <li>Melhorar, personalizar e expandir a nossa aplicação</li>
            <li>Compreender como utiliza a nossa aplicação</li>
            <li>Desenvolver novos produtos, serviços e funcionalidades</li>
            <li>Comunicar consigo diretamente ou através dos nossos parceiros</li>
            <li>Prevenir fraudes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Proteção de Dados</h2>
          <p>
            Em conformidade com o Regulamento Geral de Proteção de Dados (RGPD) da UE, implementamos medidas técnicas e organizacionais adequadas para garantir um nível de segurança adequado ao risco.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Os Seus Direitos de Privacidade</h2>
          <p>
            Como residente na UE/EEE, tem os seguintes direitos relativamente aos seus dados pessoais:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Direito de acesso</li>
            <li>Direito de retificação</li>
            <li>Direito ao apagamento</li>
            <li>Direito à limitação do tratamento</li>
            <li>Direito à portabilidade dos dados</li>
            <li>Direito de oposição</li>
            <li>Direito de não ficar sujeito a decisões automatizadas</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Cookies e Tecnologias Semelhantes</h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência, analisar a utilização da nossa aplicação e personalizar o conteúdo.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Transferências Internacionais de Dados</h2>
          <p>
            Os seus dados podem ser transferidos e mantidos em computadores localizados fora do seu estado, província, país ou outra jurisdição governamental, onde as leis de proteção de dados podem ser diferentes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Alterações a Esta Política</h2>
          <p>
            Podemos atualizar a nossa Política de Privacidade periodicamente. Notificaremos quaisquer alterações publicando a nova Política de Privacidade nesta página.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">8. Contacte-nos</h2>
          <p>
            Se tiver dúvidas ou preocupações sobre a nossa Política de Privacidade, contacte-nos em:
          </p>
          <p>
            Email: privacidade@rideprofit.pt<br />
            Endereço: Av. da Liberdade 110, 1269-046 Lisboa, Portugal
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

export default Privacy;
