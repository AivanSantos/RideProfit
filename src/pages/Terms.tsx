import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-16 px-4">
        <Link to="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Página Inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Termos de Serviço</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Estes Termos de Serviço regem a utilização do RideProfit, uma aplicação de gestão financeira familiar. 
            Ao utilizar os nossos serviços, concorda com estes termos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Utilização dos Serviços</h2>
          <p>
            1.1. Deve ter pelo menos 18 anos para utilizar o RideProfit ou ter autorização de um tutor legal.
          </p>
          <p>
            1.2. É responsável por manter a confidencialidade da sua conta e senha.
          </p>
          <p>
            1.3. Concorda em utilizar o RideProfit apenas para fins legais e de acordo com estes Termos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Direitos de Propriedade Intelectual</h2>
          <p>
            2.1. O RideProfit e todos os seus conteúdos, recursos e funcionalidades são propriedade da RideProfit e estão protegidos por leis de propriedade intelectual.
          </p>
          <p>
            2.2. Não pode copiar, modificar, distribuir, vender ou alugar qualquer parte dos nossos serviços sem a nossa autorização explícita.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Dados do Utilizador</h2>
          <p>
            3.1. Os dados introduzidos no RideProfit são propriedade do utilizador.
          </p>
          <p>
            3.2. Concedemos-lhe uma licença para armazenar, processar e visualizar os seus dados na nossa plataforma.
          </p>
          <p>
            3.3. A utilização dos seus dados pessoais é regida pela nossa Política de Privacidade.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Limitação de Responsabilidade</h2>
          <p>
            4.1. O RideProfit é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo.
          </p>
          <p>
            4.2. Não somos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes da utilização dos nossos serviços.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Alterações aos Termos</h2>
          <p>
            5.1. Reservamo-nos o direito de modificar estes Termos a qualquer momento.
          </p>
          <p>
            5.2. As alterações entrarão em vigor após a publicação dos Termos revistos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Lei Aplicável</h2>
          <p>
            6.1. Estes Termos são regidos pelas leis de Portugal.
          </p>
          <p>
            6.2. Quaisquer disputas serão resolvidas nos tribunais de Portugal.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Contacto</h2>
          <p>
            Para quaisquer questões relativas a estes Termos, por favor contacte-nos em: info@rideprofit.pt
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

export default Terms;
