import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Dashboard/Layout";
import DashboardSummary from "@/components/Dashboard/Summary";
import TransactionList from "@/components/TransactionList";
import FinancialChart from "@/components/FinancialChart";
import { Button } from "@/components/ui/button";
import AddTransactionModal from "@/components/AddTransactionModal";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTransactions } from "@/contexts/TransactionContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface NewTransaction {
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      navigate('/login');
    }
  };

  const { 
    transactions, 
    addTransaction, 
    isLoading, 
    error,
    totalIncome,
    totalExpenses,
    balance,
    deleteTransaction
  } = useTransactions();

  const handleAddTransaction = async (newTransaction: NewTransaction) => {
    try {
      await addTransaction(newTransaction);
      setIsExpenseModalOpen(false);
      setIsIncomeModalOpen(false);
      toast.success('Transação adicionada com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar transação');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success('Transação excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir transação');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dashboard...</p>
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
            <p className="text-red-600">Erro ao carregar dados: {error instanceof Error ? error.message : String(error)}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Bem-vindo(a) de volta ao seu painel financeiro
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-xl sm:text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 sm:gap-3 my-4 md:my-6">
        <Button 
          onClick={() => setIsExpenseModalOpen(true)}
          variant="outline"
          className="hover-lift text-xs sm:text-sm"
          size={isMobile ? "sm" : "default"}
        >
          <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Adicionar Despesa
        </Button>
        <Button 
          onClick={() => setIsIncomeModalOpen(true)}
          variant="outline"
          className="hover-lift text-xs sm:text-sm"
          size={isMobile ? "sm" : "default"}
        >
          <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Adicionar Receita
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
        <FinancialChart 
          transactions={transactions}
          type="expense"
        />
        <FinancialChart 
          transactions={transactions}
          type="income"
        />
      </div>

      {/* Transactions Section */}
      <div className="my-4 sm:my-6">
        {transactions.length > 0 ? (
          <TransactionList 
            transactions={transactions.slice(0, 5)} 
            title="Transações Recentes"
            showViewAll
          />
        ) : (
          <div className="border rounded-lg p-4 sm:p-6 text-center">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">Sem transações registadas. Adicione despesas ou receitas para ver aqui.</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Button 
                onClick={() => setIsExpenseModalOpen(true)}
                variant="outline"
                className="text-xs sm:text-sm"
                size={isMobile ? "sm" : "default"}
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Adicionar Despesa
              </Button>
              <Button 
                onClick={() => setIsIncomeModalOpen(true)}
                variant="outline"
                className="text-xs sm:text-sm"
                size={isMobile ? "sm" : "default"}
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
        type="expense"
      />
      
      <AddTransactionModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        type="income"
      />
    </DashboardLayout>
  );
};

export default Dashboard;
