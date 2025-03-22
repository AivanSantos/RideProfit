import { useMemo } from "react";
import { Transaction } from "@/lib/supabase-operations";
import PieChart3D from "./PieChart3D";

interface FinancialChartProps {
  transactions: Transaction[];
  type: "income" | "expense";
}

// Cores para cada categoria
const categoryColors: Record<string, string> = {
  // Despesas
  "alimentacao": "#FF6B6B",
  "transporte": "#4ECDC4",
  "moradia": "#45B7D1",
  "saude": "#96CEB4",
  "educacao": "#FFEEAD",
  "lazer": "#D4A5A5",
  "outros": "#9B9B9B",
  
  // Receitas
  "salario": "#4CAF50",
  "investimentos": "#2196F3",
  "freelance": "#9C27B0",
  "bonus": "#FF9800",
  "presente": "#E91E63",
  "outras_receitas": "#607D8B"
};

const FinancialChart = ({ transactions, type }: FinancialChartProps) => {
  const chartData = useMemo(() => {
    const filteredTransactions = transactions.filter((t) => t.type === type);
    const categoryTotals = new Map<string, number>();

    // Calcular total por categoria
    filteredTransactions.forEach((transaction) => {
      const currentTotal = categoryTotals.get(transaction.category) || 0;
      categoryTotals.set(transaction.category, currentTotal + Number(transaction.amount));
    });

    // Converter para o formato do gráfico
    return Array.from(categoryTotals.entries()).map(([category, value]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
      value,
      color: categoryColors[category] || "#9B9B9B"
    }));
  }, [transactions, type]);

  const title = type === "expense" ? "Despesas por Categoria" : "Receitas por Categoria";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <PieChart3D data={chartData} title={title} />
    </div>
  );
};

export default FinancialChart;
