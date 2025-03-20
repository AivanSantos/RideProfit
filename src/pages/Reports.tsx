
import { useState, useEffect } from "react";
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
  Users
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'expense' | 'income';
}

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState("6"); // June
  const [selectedYear, setSelectedYear] = useState("2023");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const isMobile = useIsMobile();

  // Fetch transactions from localStorage or API
  useEffect(() => {
    // We'll simulate fetching from localStorage
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // Calculate summary data based on actual transactions
  const calculateSummaryData = () => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    const savingsRate = income > 0 ? Math.round((balance / income) * 100 * 10) / 10 : 0;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance,
      savingsRate,
    };
  };

  const summaryData = calculateSummaryData();

  // Calculate expense categories data
  const calculateExpenseCategories = () => {
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    
    // Group by category and calculate percentages
    const categoryTotals: Record<string, number> = {};
    const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    expenseTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    // Convert to chart data format
    const colors = ["#0ea5e9", "#f97316", "#8b5cf6", "#22c55e", "#ef4444"];
    
    return Object.entries(categoryTotals).map(([name, value], index) => ({
      name,
      value: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
      color: colors[index % colors.length],
    }));
  };

  // Calculate income categories data
  const calculateIncomeCategories = () => {
    const incomeTransactions = transactions.filter(t => t.type === "income");
    
    // Group by category and calculate percentages
    const categoryTotals: Record<string, number> = {};
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

    incomeTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    // Convert to chart data format
    const colors = ["#0ea5e9", "#f97316", "#8b5cf6"];
    
    return Object.entries(categoryTotals).map(([name, value], index) => ({
      name,
      value: totalIncome > 0 ? Math.round((value / totalIncome) * 100) : 0,
      color: colors[index % colors.length],
    }));
  };

  // If no transactions exist, use default data
  const expenseCategories = transactions.length > 0 
    ? calculateExpenseCategories() 
    : [
        { name: "Alimentação", value: 0, color: "#0ea5e9" },
        { name: "Habitação", value: 0, color: "#f97316" },
        { name: "Transporte", value: 0, color: "#8b5cf6" },
        { name: "Lazer", value: 0, color: "#22c55e" },
        { name: "Outros", value: 0, color: "#ef4444" },
      ];

  const incomeCategories = transactions.length > 0 
    ? calculateIncomeCategories() 
    : [
        { name: "Salário", value: 0, color: "#0ea5e9" },
        { name: "Freelance", value: 0, color: "#f97316" },
        { name: "Investimentos", value: 0, color: "#8b5cf6" },
      ];

  // Calculate monthly data
  const calculateMonthlyData = (type: 'expense' | 'income') => {
    // Default to 0 for all months
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    const colors = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    
    // Initialize with zeroes
    const monthlyData = months.map((name, index) => ({
      name,
      value: 0,
      color: colors[index % colors.length]
    }));
    
    // If we have transactions, populate with real data
    if (transactions.length > 0) {
      const filteredTrans = transactions.filter(t => t.type === type);
      
      filteredTrans.forEach(t => {
        const date = new Date(t.date.split("/").reverse().join("-"));
        const month = date.getMonth();
        
        // Only count transactions from current year
        if (date.getFullYear().toString() === selectedYear && month < 6) {
          monthlyData[month].value += t.amount;
        }
      });
    }
    
    return monthlyData;
  };

  // Monthly data for charts
  const monthlyExpenseData = calculateMonthlyData('expense');
  const monthlyIncomeData = calculateMonthlyData('income');

  // Family members data - this would ideally be calculated from transactions with member info
  const familyData = [
    { name: "João", value: 0, color: "#0ea5e9" },
    { name: "Maria", value: 0, color: "#f97316" },
    { name: "Pedro", value: 0, color: "#8b5cf6" },
    { name: "Ana", value: 0, color: "#22c55e" },
  ];

  const handleExportReport = () => {
    // This would handle report export in a real app
    console.log("Exporting report...");
  };

  const handleShareReport = () => {
    // This would handle report sharing in a real app
    console.log("Sharing report...");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Relatórios Financeiros</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Analise e exporte relatórios detalhados das suas finanças
        </p>
      </div>

      {/* Report Controls */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-md md:text-lg font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Período do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Select
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mensal</SelectItem>
                <SelectItem value="quarter">Trimestral</SelectItem>
                <SelectItem value="year">Anual</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger disabled={selectedPeriod === "year"}>
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Janeiro</SelectItem>
                <SelectItem value="2">Fevereiro</SelectItem>
                <SelectItem value="3">Março</SelectItem>
                <SelectItem value="4">Abril</SelectItem>
                <SelectItem value="5">Maio</SelectItem>
                <SelectItem value="6">Junho</SelectItem>
                <SelectItem value="7">Julho</SelectItem>
                <SelectItem value="8">Agosto</SelectItem>
                <SelectItem value="9">Setembro</SelectItem>
                <SelectItem value="10">Outubro</SelectItem>
                <SelectItem value="11">Novembro</SelectItem>
                <SelectItem value="12">Dezembro</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleExportReport}
              className="hover-lift text-xs md:text-sm"
              size={isMobile ? "sm" : "default"}
            >
              <Download className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShareReport}
              className="hover-lift text-xs md:text-sm"
              size={isMobile ? "sm" : "default"}
            >
              <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              Partilhar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Receitas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {formatCurrency(summaryData.totalIncome)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Despesas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">
              {formatCurrency(summaryData.totalExpenses)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {formatCurrency(summaryData.balance)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Taxa de Poupança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-primary">
              {summaryData.savingsRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px] mb-4">
          <TabsTrigger value="overview" className="flex items-center text-xs md:text-sm">
            <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="category" className="flex items-center text-xs md:text-sm">
            <PieChart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Categorias
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center text-xs md:text-sm">
            <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Família
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Despesas Mensais
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Comparação de despesas ao longo dos meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={monthlyExpenseData} 
                  type="bar" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium flex items-center">
                  <LineChart className="h-4 w-4 mr-2" />
                  Receitas vs Despesas
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Comparação entre receitas e despesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={monthlyIncomeData} 
                  type="bar" 
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-md md:text-lg font-medium">Resumo do Relatório</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Resumo geral do período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-sm md:text-base">
                <p>
                  Para o período de {selectedPeriod === "month" ? "Junho" : selectedPeriod === "quarter" ? "2º Trimestre" : "Ano"} de {selectedYear}, a análise financeira indica:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Receitas totais de {formatCurrency(summaryData.totalIncome)}, incluindo salários e receitas adicionais.</li>
                  <li>Despesas totais de {formatCurrency(summaryData.totalExpenses)}, com habitação sendo a maior categoria.</li>
                  <li>Saldo {summaryData.balance >= 0 ? "positivo" : "negativo"} de {formatCurrency(Math.abs(summaryData.balance))}, resultando numa taxa de poupança de {summaryData.savingsRate}%.</li>
                  <li>Comparado com o período anterior, {summaryData.totalIncome > 0 ? "existem dados de receita e despesa." : "ainda não existem dados suficientes para comparação."}</li>
                </ul>
                <p className="mt-4">
                  Recomendações para melhoria:
                </p>
                <ul className="space-y-2">
                  <li>Considerar estabelecer um fundo de emergência com 3-6 meses de despesas.</li>
                  <li>Reavaliar os gastos na categoria "Outros" para identificar potenciais poupanças.</li>
                  <li>Aumentar a contribuição para investimentos de longo prazo.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="category">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium">Despesas por Categoria</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Distribuição percentual das despesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={expenseCategories} 
                  type="pie" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium">Receitas por Fonte</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Distribuição percentual das receitas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={incomeCategories} 
                  type="pie" 
                />
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-md md:text-lg font-medium">Análise por Categoria</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Detalhes de gastos por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm md:text-base">{category.name}</h3>
                      <span className="text-md md:text-lg font-bold">
                        {formatCurrency((summaryData.totalExpenses * category.value) / 100)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${category.value}%`, 
                          backgroundColor: category.color 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {category.value}% do total de despesas
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="family">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium">Despesas por Membro da Família</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Contribuição de cada membro nas despesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={familyData} 
                  type="pie" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-1 md:pb-2">
                <CardTitle className="text-md md:text-lg font-medium">Despesas Individuais por Categoria</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Principais categorias de despesas por membro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialChart 
                  title="" 
                  data={[
                    { name: "João", value: 0, color: "#0ea5e9" },
                    { name: "Maria", value: 0, color: "#f97316" },
                    { name: "Pedro", value: 0, color: "#8b5cf6" },
                    { name: "Ana", value: 0, color: "#22c55e" },
                  ]} 
                  type="bar" 
                />
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-md md:text-lg font-medium">Análise por Membro da Família</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Detalhes das despesas por pessoa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 md:space-y-8">
                {familyData.map((member) => (
                  <div key={member.name} className="space-y-3 md:space-y-4">
                    <h3 className="font-bold text-md md:text-lg">{member.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm md:text-base">Principais Despesas</h4>
                        <ul className="space-y-2 text-xs md:text-sm">
                          <li className="flex justify-between">
                            <span>Alimentação</span>
                            <span>{formatCurrency(0)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Transporte</span>
                            <span>{formatCurrency(0)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Lazer</span>
                            <span>{formatCurrency(0)}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm md:text-base">Resumo</h4>
                        <div className="space-y-2 text-xs md:text-sm">
                          <div className="flex justify-between">
                            <span>Total Gasto</span>
                            <span className="font-bold">
                              {formatCurrency(0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>% do Total Familiar</span>
                            <span className="font-bold">{member.value}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Reports;
