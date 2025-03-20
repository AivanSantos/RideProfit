import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getTransactions, addTransaction, deleteTransaction, Transaction } from "@/lib/supabase-operations";
import FinancialChart from "@/components/FinancialChart";
import DashboardLayout from "@/components/Dashboard/Layout";
import TransactionList from "@/components/TransactionList";
import AddTransactionModal from "@/components/AddTransactionModal";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  PlusCircle, 
  Filter, 
  Search,
  Download,
  Share2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Expenses = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions(user!.id);
      const expenseTransactions = data.filter(t => t.type === "expense");
      setTransactions(expenseTransactions);
      setFilteredTransactions(expenseTransactions);
    } catch (error) {
      console.error("Erro ao carregar despesas:", error);
      toast.error("Erro ao carregar despesas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addTransaction({
        user_id: user.id,
        type: "expense",
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
      });

      toast.success("Despesa adicionada com sucesso!");
      setFormData({
        amount: "",
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
      loadTransactions();
    } catch (error) {
      toast.error("Erro ao adicionar despesa");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Despesa removida com sucesso!");
      loadTransactions();
    } catch (error) {
      toast.error("Erro ao remover despesa");
    }
  };

  useEffect(() => {
    let filtered = [...transactions];
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    if (dateFilter) {
      const [year, month] = dateFilter.split("-");
      filtered = filtered.filter(t => {
        const transDate = new Date(t.date);
        return (
          transDate.getFullYear() === parseInt(year) && 
          transDate.getMonth() === parseInt(month) - 1
        );
      });
    }
    
    setFilteredTransactions(filtered);
  }, [searchTerm, categoryFilter, dateFilter, transactions]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([newTransaction, ...transactions]);
    setFilteredTransactions([newTransaction, ...filteredTransactions]);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setDateFilter("");
  };

  // Calculate total expenses
  const totalExpenses = transactions.reduce(
    (sum, transaction) => sum + transaction.amount, 
    0
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando despesas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Gestão de Despesas</h1>
        <p className="text-gray-600">
          Controle e analise todas as suas despesas
        </p>
      </div>

      {/* Summary Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total de Despesas</CardTitle>
            <CardDescription>Valor total gasto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 hover-lift transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Despesa
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Partilhar com Família
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Pesquisar despesas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="alimentação">Alimentação</SelectItem>
                <SelectItem value="habitação">Habitação</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="saúde">Saúde</SelectItem>
                <SelectItem value="educação">Educação</SelectItem>
                <SelectItem value="lazer">Lazer</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filtrar por mês"
            />
          </div>
          
          {(searchTerm || categoryFilter || dateFilter) && (
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {filteredTransactions.length} resultados encontrados
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts & Transactions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialChart 
              transactions={transactions}
              type="expense"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Despesas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialChart 
              transactions={transactions}
              type="expense"
            />
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      {transactions.length > 0 ? (
        <TransactionList 
          transactions={filteredTransactions} 
          title="Todas as Despesas" 
        />
      ) : (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-4">Sem despesas registadas. Adicione despesas para ver aqui.</p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Despesa
          </Button>
        </div>
      )}

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        type="expense"
      />
    </DashboardLayout>
  );
};

export default Expenses;
