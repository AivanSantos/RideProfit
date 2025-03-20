import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-green-light/20 via-white to-white pt-24 pb-16 section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-slideInFromLeft">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue mb-4 text-sm font-medium">
              Controle Financeiro Inteligente
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              Gerencie suas finanças com{" "}
              <span className="text-brand-blue">facilidade</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 mb-8">
              O RideProfit é a solução completa para gerir o orçamento da sua
              família. Simples, intuitivo e poderoso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/register">
                <Button size="lg" className="px-8 py-6 text-base font-medium w-full sm:w-auto">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base font-medium w-full sm:w-auto"
                >
                  Já tenho conta
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-foreground/60">
              Experimente gratuitamente por 14 dias. Sem cartão de crédito.
            </p>
          </div>

          <div className="lg:order-2 animate-slideInFromRight">
            <div className="glass rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto animate-float">
              <img
                src="/dashboardrideprofit.png"
                alt="RideProfit Dashboard"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
