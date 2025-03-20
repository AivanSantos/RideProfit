import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PieChart, Users, Bell, Wallet, Calendar, TrendingUp, PiggyBank, LineChart, Shield } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar suas finanças de forma eficiente e
            segura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-xl bg-white border border-border/50 hover:border-brand-blue/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/register">
            <Button className="px-8 py-6 text-base font-medium">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Wallet,
    title: "Controle Total",
    description:
      "Gerencie todas as suas contas, cartões e investimentos em um só lugar.",
  },
  {
    icon: PiggyBank,
    title: "Economia Inteligente",
    description:
      "Receba alertas de gastos e sugestões personalizadas para economizar.",
  },
  {
    icon: LineChart,
    title: "Relatórios Detalhados",
    description:
      "Visualize seus gastos e receitas com gráficos e relatórios completos.",
  },
  {
    icon: Shield,
    title: "Segurança Máxima",
    description:
      "Seus dados estão protegidos com criptografia de ponta a ponta.",
  },
];

export default Features;
