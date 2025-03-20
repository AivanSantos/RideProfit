import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Smartphone
} from "lucide-react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "RideProfit - Gestão Financeira Familiar";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <section id="como-funciona" className="py-24 section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-medium">
              Como Funciona
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Três passos simples para o controlo financeiro
            </h2>
            <p className="text-foreground/70 text-lg">
              Comece hoje mesmo a gerir as suas finanças de forma eficiente e sem complicações.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Registe a sua conta</h3>
              <p className="text-foreground/70">
                Crie a sua conta gratuitamente e adicione os membros da sua família para uma gestão colaborativa.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Registe as suas transações</h3>
              <p className="text-foreground/70">
                Adicione as suas despesas e receitas, categorizando-as para um melhor controlo.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Visualize e analise</h3>
              <p className="text-foreground/70">
                Veja gráficos 3D e relatórios detalhados para tomar decisões financeiras informadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 animate-slideInFromLeft">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-medium">
                Benefícios
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Transforme a forma como a sua família gere o dinheiro
              </h2>
              <p className="text-foreground/70 text-lg mb-8">
                O RideProfit foi desenvolvido para simplificar a gestão financeira familiar, proporcionando ferramentas poderosas mas intuitivas.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visualização clara</h3>
                    <p className="text-foreground/70">
                      Gráficos interativos em 3D que mostram de forma clara a distribuição dos seus gastos.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Segurança garantida</h3>
                    <p className="text-foreground/70">
                      Os seus dados financeiros são encriptados e protegidos com os mais altos padrões de segurança.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Relatórios detalhados</h3>
                    <p className="text-foreground/70">
                      Exportação de relatórios financeiros em diversos formatos para uma análise mais profunda.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Acesso em qualquer dispositivo</h3>
                    <p className="text-foreground/70">
                      Aceda às suas finanças a partir de qualquer dispositivo, a qualquer momento e em qualquer lugar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center animate-slideInFromRight">
              <div className="glass rounded-2xl shadow-xl overflow-hidden max-w-md animate-float">
                <img
                  src="/rideprofitemação.png"
                  alt="RideProfit em ação"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-padding bg-gradient-to-br from-primary/10 via-blue-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Pronto para controlar melhor as suas finanças familiares?
            </h2>
            <p className="text-foreground/70 text-lg mb-10">
              Junte-se a milhares de famílias que já estão a utilizar o RideProfit para alcançar uma vida financeira mais estável e organizada.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="px-8 py-6 text-base font-medium">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-medium"
                >
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white section-padding border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <img 
                src="/logo.png" 
                alt="RideProfit Logo" 
                className="h-16 w-auto mb-4" 
              />
              <p className="text-foreground/70 mb-6">
                A solução completa para a gestão financeira da sua família.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">Sobre Nós</Link></li>
                <li><Link to="/about#contactos" className="text-foreground/70 hover:text-primary transition-colors">Contactos</Link></li>
                <li><Link to="/about#carreiras" className="text-foreground/70 hover:text-primary transition-colors">Carreiras</Link></li>
                <li><a href="https://blog.rideprofit.pt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-3">
                <li><a href="https://ajuda.rideprofit.pt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">Centro de Ajuda</a></li>
                <li><a href="https://docs.rideprofit.pt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">Guias de Utilização</a></li>
                <li><a href="https://api.rideprofit.pt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">API</a></li>
                <li><a href="https://comunidade.rideprofit.pt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">Termos de Serviço</Link></li>
                <li><Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/cookies" className="text-foreground/70 hover:text-primary transition-colors">Cookies</Link></li>
                <li><Link to="/gdpr" className="text-foreground/70 hover:text-primary transition-colors">RGPD</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-100 text-center text-foreground/50 text-sm">
            <p>&copy; {new Date().getFullYear()} RideProfit. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
