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
  TrendingUp
} from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

const Income = () => {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
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
      const incomeTransactions = data.filter(t => t.type === "income");
      setTransactions(incomeTransactions);
      setFilteredTransactions(incomeTransactions);
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
      toast.error("Erro ao carregar receitas");
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
        type: "income",
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
      });

      toast.success("Receita adicionada com sucesso!");
      setFormData({
        amount: "",
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });
      loadTransactions();
    } catch (error) {
      toast.error("Erro ao adicionar receita");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Receita removida com sucesso!");
      loadTransactions();
    } catch (error) {
      toast.error("Erro ao remover receita");
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

  // Calculate total income
  const totalIncome = transactions.reduce(
    (sum, transaction) => sum + transaction.amount, 
    0
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando receitas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Gestão de Receitas</h1>
        <p className="text-gray-600">
          Controle e analise todas as suas fontes de rendimento
        </p>
      </div>

      {/* Summary Card */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="hover-lift transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total de Receitas</CardTitle>
            <CardDescription>Valor total recebido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
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
              className="bg-green-600 hover:bg-green-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Receita
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Análise de Tendências
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar Receitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Pesquisar receitas..."
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
                <SelectItem value="salário">Salário</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="investimentos">Investimentos</SelectItem>
                <SelectItem value="presente">Presente</SelectItem>
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
            <CardTitle>Receitas por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialChart 
              transactions={transactions}
              type="income"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Receitas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <FinancialChart 
              transactions={transactions}
              type="income"
            />
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      {transactions.length > 0 ? (
        <TransactionList 
          transactions={filteredTransactions} 
          title="Todas as Receitas" 
        />
      ) : (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-4">Sem receitas registadas. Adicione receitas para ver aqui.</p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Receita
          </Button>
        </div>
      )}

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        type="income"
      />
    </DashboardLayout>
  );
};

export default Income;
