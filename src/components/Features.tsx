import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PieChart, Users, Bell, Wallet, Calendar, TrendingUp } from "lucide-react";

const Features = () => {
  return (
    <section id="funcionalidades" className="py-24 bg-gradient-to-b from-white via-brand-green-light/10 to-white section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue mb-4 text-sm font-medium">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Tudo que você precisa para{" "}
            <span className="text-brand-blue">controlar suas finanças</span>
          </h2>
          <p className="text-foreground/70 text-lg">
            O RideProfit oferece um conjunto completo de ferramentas para ajudar a sua família
            a alcançar seus objetivos financeiros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-brand-green-light/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
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
    title: "Gestão de Despesas",
    description:
      "Registre e categorize suas despesas facilmente, com visualização clara de para onde vai seu dinheiro.",
    icon: Wallet,
  },
  {
    title: "Orçamento Familiar",
    description:
      "Crie orçamentos personalizados e acompanhe os gastos de toda a família em tempo real.",
    icon: Users,
  },
  {
    title: "Relatórios Detalhados",
    description:
      "Visualize relatórios e gráficos interativos que mostram sua situação financeira de forma clara.",
    icon: PieChart,
  },
  {
    title: "Lembretes Inteligentes",
    description:
      "Receba notificações sobre contas a pagar, metas a atingir e limites de orçamento.",
    icon: Bell,
  },
  {
    title: "Planejamento Futuro",
    description:
      "Estabeleça metas financeiras e acompanhe seu progresso com projeções realistas.",
    icon: TrendingUp,
  },
  {
    title: "Despesas Recorrentes",
    description:
      "Automatize o registro de despesas fixas e receba lembretes de pagamentos.",
    icon: Calendar,
  },
];

export default Features;
