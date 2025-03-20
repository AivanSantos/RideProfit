import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-16 px-4">
        <Link to="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Página Inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Sobre Nós</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            A RideProfit é uma empresa portuguesa dedicada a ajudar famílias a gerir melhor as suas finanças
            pessoais através de tecnologia inovadora e acessível.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">A Nossa Missão</h2>
          <p>
            Capacitar cada família portuguesa a tomar decisões financeiras informadas, 
            proporcionando ferramentas simples mas poderosas para gerir as suas finanças pessoais.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">A Nossa Visão</h2>
          <p>
            Ser a plataforma de referência em Portugal para a gestão financeira familiar, 
            contribuindo para o bem-estar financeiro de milhares de famílias portuguesas.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Os Nossos Valores</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Simplicidade:</strong> Acreditamos que a gestão financeira deve ser acessível a todos.</li>
            <li><strong>Transparência:</strong> Valorizamos a clareza na comunicação e nas nossas operações.</li>
            <li><strong>Privacidade:</strong> Protegemos os dados dos nossos utilizadores com os mais elevados padrões de segurança.</li>
            <li><strong>Inovação:</strong> Procuramos constantemente melhorar os nossos serviços e acompanhar as necessidades em evolução dos nossos utilizadores.</li>
            <li><strong>Proximidade:</strong> Mantemos uma relação próxima com a comunidade portuguesa e as suas necessidades específicas.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">A Nossa História</h2>
          <p>
            A RideProfit foi fundada em 2023 por um grupo de profissionais portugueses das áreas de 
            tecnologia e finanças, unidos pela visão comum de democratizar o acesso a ferramentas 
            de gestão financeira de qualidade, adaptadas especificamente para as famílias portuguesas.
          </p>
          <p>
            Após observar que muitas famílias em Portugal enfrentavam dificuldades para gerir o seu 
            orçamento familiar, especialmente em períodos de incerteza económica, decidimos criar 
            uma solução que combina simplicidade, eficácia e segurança, tudo com um toque português.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Sede em Portugal</h2>
          <p>
            A RideProfit tem sede em Lisboa e a nossa equipa é 100% portuguesa. Orgulhamo-nos de 
            contribuir para a economia local e de criar soluções tecnológicas de excelência a 
            partir de Portugal para o mundo.
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Pronto para começar?</h3>
          <Link to="/register">
            <Button size="lg">Registar Gratuitamente</Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-16 bg-white section-padding border-t border-gray-100">
        <div className="container mx-auto text-center">
          <img 
            src="/logo.png" 
            alt="RideProfit Logo" 
            className="h-16 w-auto mx-auto mb-4" 
          />
          <p>&copy; {new Date().getFullYear()} RideProfit. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
