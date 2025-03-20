
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, change, trend, icon }: SummaryCardProps) => {
  return (
    <Card className="hover-lift transition-all duration-500">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs flex items-center mt-1">
            {trend === "up" && <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />}
            <span
              className={
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                  ? "text-red-600"
                  : "text-gray-500"
              }
            >
              {change} desde o mês passado
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardSummaryProps {
  balance: number;
  income: number;
  expenses: number;
  incomeChange: number;
  expensesChange: number;
}

const DashboardSummary = ({
  balance,
  income,
  expenses,
  incomeChange,
  expensesChange,
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Saldo Atual"
        value={formatCurrency(balance)}
        icon={<Wallet className="h-4 w-4 text-primary" />}
      />
      <SummaryCard
        title="Receitas Totais"
        value={formatCurrency(income)}
        change={`${incomeChange > 0 ? "+" : ""}${incomeChange}%`}
        trend={incomeChange > 0 ? "up" : incomeChange < 0 ? "down" : "neutral"}
        icon={<ArrowUpRight className="h-4 w-4 text-green-600" />}
      />
      <SummaryCard
        title="Despesas Totais"
        value={formatCurrency(expenses)}
        change={`${expensesChange > 0 ? "+" : ""}${expensesChange}%`}
        trend={expensesChange > 0 ? "down" : expensesChange < 0 ? "up" : "neutral"}
        icon={<ArrowDownRight className="h-4 w-4 text-red-600" />}
      />
    </div>
  );
};

export default DashboardSummary;
