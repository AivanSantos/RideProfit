import { useState } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import FinancialChart from "@/components/FinancialChart";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart3, 
  LineChart, 
  Download, 
  Share2,
  FileText,
  PieChart,
  Calendar,
  Users,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactions } from "@/contexts/TransactionContext";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1 + "");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() + "");
  const isMobile = useIsMobile();
  
  const { 
    transactions, 
    loading, 
    error,
    totalIncome,
    totalExpense,
    balance
  } = useTransactions();

  // Calcular taxa de economia
  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100 * 10) / 10 : 0;

  // Calcular categorias de despesas
  const calculateExpenseCategories = () => {
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    const categoryTotals: Record<string, number> = {};
    const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    expenseTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const colors = ["#0ea5e9", "#f97316", "#8b5cf6", "#22c55e", "#ef4444"];
    return Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value: total > 0 ? Math.round((value / total) * 100) : 0,
        amount: value,
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  // Calcular categorias de receitas
  const calculateIncomeCategories = () => {
    const incomeTransactions = transactions.filter(t => t.type === "income");
    const categoryTotals: Record<string, number> = {};
    const total = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

    incomeTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const colors = ["#0ea5e9", "#f97316", "#8b5cf6", "#22c55e", "#ef4444"];
    return Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value: total > 0 ? Math.round((value / total) * 100) : 0,
        amount: value,
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const expenseCategories = calculateExpenseCategories();
  const incomeCategories = calculateIncomeCategories();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando relatórios...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-600">Erro ao carregar dados: {error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Relatórios Financeiros</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Analise e exporte relatórios detalhados das suas finanças
        </p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Receitas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-green-500">
                {formatCurrency(totalIncome)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Despesas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-2xl font-bold text-red-500">
                {formatCurrency(totalExpense)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(balance)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Taxa de Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {savingsRate}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6">
        {/* Gráficos de Linha */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receitas ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChart transactions={transactions} type="income" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Despesas ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChart transactions={transactions} type="expense" />
            </CardContent>
          </Card>
        </div>

        {/* Categorias */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias de Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{formatCurrency(category.amount)}</span>
                      <span className="text-sm font-medium">{category.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias de Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{formatCurrency(category.amount)}</span>
                      <span className="text-sm font-medium">{category.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
