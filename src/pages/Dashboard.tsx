
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import DashboardSummary from "@/components/Dashboard/Summary";
import TransactionList from "@/components/TransactionList";
import FinancialChart from "@/components/FinancialChart";
import { Button } from "@/components/ui/button";
import AddTransactionModal from "@/components/AddTransactionModal";
import { generateRandomData } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'expense' | 'income';
}

const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load transactions from localStorage if available
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions([]);
    }
    
    const expenseCategories = ["Alimentação", "Habitação", "Transporte", "Saúde", "Educação", "Lazer", "Outros"];
    const incomeCategories = ["Salário", "Freelance", "Investimentos", "Presente", "Outros"];
    
    // Generate empty data
    setExpenseData(generateRandomData(expenseCategories));
    setIncomeData(generateRandomData(incomeCategories));
  }, []);

  // Update expense and income chart data when transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      updateChartData();
    }
    // Save transactions to localStorage whenever they change
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const updateChartData = () => {
    // Process expense data
    const expensesByCategory: Record<string, number> = {};
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    expenseTransactions.forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
    
    const expenseChartData = Object.entries(expensesByCategory).map(([name, amount], index) => ({
      name,
      value: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      color: expenseData[index % expenseData.length]?.color || getRandomColor(),
    }));
    
    // Process income data
    const incomesByCategory: Record<string, number> = {};
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    incomeTransactions.forEach(t => {
      incomesByCategory[t.category] = (incomesByCategory[t.category] || 0) + t.amount;
    });
    
    const incomeChartData = Object.entries(incomesByCategory).map(([name, amount], index) => ({
      name,
      value: totalIncome > 0 ? Math.round((amount / totalIncome) * 100) : 0,
      color: incomeData[index % incomeData.length]?.color || getRandomColor(),
    }));
    
    if (expenseChartData.length > 0) setExpenseData(expenseChartData);
    if (incomeChartData.length > 0) setIncomeData(incomeChartData);
  };

  const getRandomColor = (): string => {
    const colors = [
      '#0ea5e9', // blue
      '#22c55e', // green
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // violet
      '#ec4899', // pink
      '#06b6d4', // cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddTransaction = (newTransaction: any) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
  };

  // Calculate summary values
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = income - expenses;

  // Calculate month-over-month changes (would be done with real data in production)
  const incomeChange = 0;
  const expensesChange = 0;

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Bem-vindo(a) de volta ao seu painel financeiro
        </p>
      </div>

      {/* Summary Cards */}
      <DashboardSummary
        balance={balance}
        income={income}
        expenses={expenses}
        incomeChange={incomeChange}
        expensesChange={expensesChange}
      />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 my-4 md:my-6">
        <Button 
          onClick={() => setIsExpenseModalOpen(true)}
          variant="outline"
          className="hover-lift text-xs md:text-sm"
          size={isMobile ? "sm" : "default"}
        >
          <PlusCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Adicionar Despesa
        </Button>
        <Button 
          onClick={() => setIsIncomeModalOpen(true)}
          variant="outline"
          className="hover-lift text-xs md:text-sm"
          size={isMobile ? "sm" : "default"}
        >
          <PlusCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Adicionar Receita
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 my-4 md:my-6">
        <FinancialChart 
          title="Despesas por Categoria" 
          data={expenseData} 
          type="pie" 
        />
        <FinancialChart 
          title="Receitas por Fonte" 
          data={incomeData} 
          type="pie" 
        />
      </div>

      {/* Transactions Section */}
      <div className="my-4 md:my-6">
        {transactions.length > 0 ? (
          <TransactionList 
            transactions={transactions.slice(0, 5)} 
            title="Transações Recentes"
            showViewAll
          />
        ) : (
          <div className="border rounded-lg p-4 md:p-6 text-center">
            <p className="text-gray-500 mb-4 text-sm md:text-base">Sem transações registadas. Adicione despesas ou receitas para ver aqui.</p>
            <div className="flex justify-center gap-3">
              <Button 
                onClick={() => setIsExpenseModalOpen(true)}
                variant="outline"
                className="text-xs md:text-sm"
                size={isMobile ? "sm" : "default"}
              >
                <PlusCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Adicionar Despesa
              </Button>
              <Button 
                onClick={() => setIsIncomeModalOpen(true)}
                variant="outline"
                className="text-xs md:text-sm"
                size={isMobile ? "sm" : "default"}
              >
                <PlusCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Adicionar Receita
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        type="expense"
      />
      
      <AddTransactionModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        type="income"
      />
    </DashboardLayout>
  );
};

export default Dashboard;
