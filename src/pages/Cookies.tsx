import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-16 px-4">
        <Link to="/" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Página Inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Esta Política de Cookies explica como o RideProfit utiliza cookies e tecnologias semelhantes 
            para reconhecê-lo quando visita a nossa aplicação. Explica o que são estas tecnologias e por 
            que as utilizamos, bem como os seus direitos para controlar o nosso uso delas.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos ficheiros de dados que são colocados no seu computador ou dispositivo móvel 
            quando visita um website ou utiliza uma aplicação online. Os cookies são amplamente utilizados 
            pelos proprietários de websites para fazer os seus websites funcionarem, ou funcionarem de forma 
            mais eficiente, bem como para fornecer informações de relatórios.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Tipos de Cookies que Utilizamos</h2>
          <h3 className="text-xl font-semibold mt-6 mb-2">2.1. Cookies Essenciais</h3>
          <p>
            Estes cookies são necessários para o funcionamento básico da nossa aplicação. Incluem cookies 
            que permitem que você se lembre e se mantenha conectado à sua conta durante uma sessão ou, se 
            assim o desejar, de sessão para sessão.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">2.2. Cookies de Análise e Desempenho</h3>
          <p>
            Estes cookies permitem-nos contar visitas e fontes de tráfego para que possamos medir e melhorar 
            o desempenho da nossa aplicação. Ajudam-nos a saber quais páginas são as mais e menos populares e 
            a ver como os visitantes se movem pela aplicação.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">2.3. Cookies de Funcionalidade</h3>
          <p>
            Estes cookies permitem que a aplicação forneça funcionalidades e personalização melhoradas. Podem 
            ser definidos por nós ou por fornecedores terceiros cujos serviços adicionámos às nossas páginas.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Controlo dos Cookies</h2>
          <p>
            Pode definir o seu navegador para recusar todos ou alguns cookies, ou para o alertar quando os 
            websites definem ou acedem a cookies. Se desativar ou recusar cookies, tenha em atenção que 
            algumas partes da nossa aplicação podem tornar-se inacessíveis ou não funcionar corretamente.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Outros Rastreadores</h2>
          <p>
            Além dos cookies, podemos utilizar outras tecnologias semelhantes, como web beacons, que permitem 
            que a nossa aplicação entenda melhor o comportamento do utilizador, identifique se um utilizador 
            já visualizou determinado conteúdo ou determinar se um email foi aberto.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Consentimento para Cookies</h2>
          <p>
            Quando visita o nosso website pela primeira vez, apresentamos-lhe um banner de cookies que lhe 
            permite aceitar ou recusar cookies não essenciais. Pode alterar as suas preferências a qualquer 
            momento acedendo às configurações de cookies no menu do utilizador.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Alterações a Esta Política</h2>
          <p>
            Podemos atualizar a nossa Política de Cookies periodicamente. Quando fizermos alterações, 
            publicaremos a política atualizada na nossa aplicação e atualizaremos a data de "última modificação".
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Contacte-nos</h2>
          <p>
            Se tiver dúvidas sobre a nossa utilização de cookies, contacte-nos em:
          </p>
          <p>
            Email: cookies@rideprofit.pt<br />
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

export default Cookies;
