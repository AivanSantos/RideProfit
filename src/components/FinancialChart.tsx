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

export default function FinancialChart({ transactions, type }: FinancialChartProps) {
  const chartData = useMemo(() => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groupedData).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [transactions]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={type === "income" ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
