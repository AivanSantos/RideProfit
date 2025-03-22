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
  return date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric'
  }).replace('.', '');
};

const parseDate = (dateString: string) => {
  const [month, year] = dateString.split(' ');
  const monthMap: { [key: string]: number } = {
    'jan': 0, 'fev': 1, 'mar': 2, 'abr': 3, 'mai': 4, 'jun': 5,
    'jul': 6, 'ago': 7, 'set': 8, 'out': 9, 'nov': 10, 'dez': 11
  };
  return new Date(parseInt(year), monthMap[month.toLowerCase()]);
};

export default function FinancialChart({ transactions = [], type }: FinancialChartProps) {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Filtrar por tipo
    const filteredTransactions = transactions.filter(t => t.type === type);

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
    const sortedData = Object.entries(groupedData)
      .map(([date, amount]) => ({
        date,
        amount,
        timestamp: parseDate(date).getTime()
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ date, amount }) => ({ date, amount }));

    return sortedData;
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
        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
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
