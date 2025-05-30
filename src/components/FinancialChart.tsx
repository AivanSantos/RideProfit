import { useMemo } from "react";
import { Transaction } from "@/lib/supabase-operations";
import PieChart3D from "./PieChart3D";

interface FinancialChartProps {
  transactions: Transaction[];
  type: "expense" | "income";
}

// Cores para cada categoria
const categoryColors: Record<string, string> = {
  // Despesas
  "alimentação": "#FF6B6B", // Vermelho suave
  "habitação": "#4ECDC4", // Verde água
  "transporte": "#45B7D1", // Azul claro
  "saúde": "#96CEB4", // Verde menta
  "educação": "#FFEEAD", // Amarelo suave
  "lazer": "#D4A5A5", // Rosa suave
  "outros": "#9B9B9B", // Cinza
  
  // Receitas
  "salário": "#4CAF50", // Verde
  "investimentos": "#2196F3", // Azul
  "freelance": "#9C27B0", // Roxo
  "bonus": "#FF9800", // Laranja
  "presente": "#E91E63", // Rosa
  "outras_receitas": "#607D8B" // Azul acinzentado
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
    return Array.from(categoryTotals.entries())
      .map(([category, value]) => ({
        name: category,
        value,
        color: categoryColors[category.toLowerCase()] || "#9B9B9B"
      }))
      .sort((a, b) => b.value - a.value); // Ordenar por valor decrescente
  }, [transactions, type]);

  const title = type === "expense" ? "Despesas por Categoria" : "Receitas por Categoria";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <PieChart3D data={chartData} title={title} />
    </div>
  );
};

export default FinancialChart;
