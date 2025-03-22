import { useMemo } from "react";
import { Transaction } from "@/lib/supabase-operations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FinancialChartProps {
  transactions: Transaction[];
  type: "income" | "expense";
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export default function FinancialChart({ transactions = [], type }: FinancialChartProps) {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Filtrar por tipo e ordenar por data
    const filteredTransactions = transactions
      .filter(t => t.type === type)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Agrupar por mês/ano
    const groupedData = filteredTransactions.reduce((acc, transaction) => {
      const date = formatDate(transaction.date);
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    // Converter para array e ordenar por data
    return Object.entries(groupedData)
      .map(([date, amount]) => ({
        date,
        amount,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  }, [transactions, type]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center border rounded-lg p-4">
        <p className="text-gray-500">
          Sem {type === "income" ? "receitas" : "despesas"} para exibir
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">
        {type === "income" ? "Receitas" : "Despesas"} por Mês
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), type === "income" ? "Receita" : "Despesa"]}
            labelFormatter={(label) => `Período: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={type === "income" ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
