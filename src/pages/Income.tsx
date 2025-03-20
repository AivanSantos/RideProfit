
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import FinancialChart from "@/components/FinancialChart";
import TransactionList from "@/components/TransactionList";
import AddTransactionModal from "@/components/AddTransactionModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { generateRandomData, generateRandomTransactions, formatCurrency } from "@/lib/utils";

const Income = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Initialize with empty data
    setTransactions([]);
    setFilteredTransactions([]);
    
    const incomeCategories = ["Salário", "Freelance", "Investimentos", "Presente", "Outros"];
    setChartData(generateRandomData(incomeCategories));
  }, []);

  useEffect(() => {
    let filtered = [...transactions];
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    if (dateFilter) {
      // This is a simplified filter by month, in a real app you'd have a proper date range selector
      const [year, month] = dateFilter.split("-");
      filtered = filtered.filter(t => {
        const transDate = new Date(t.date.split("/").reverse().join("-"));
        return (
          transDate.getFullYear() === parseInt(year) && 
          transDate.getMonth() === parseInt(month) - 1
        );
      });
    }
    
    setFilteredTransactions(filtered);
  }, [searchTerm, categoryFilter, dateFilter, transactions]);

  const handleAddTransaction = (newTransaction: any) => {
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
        <FinancialChart 
          title="Receitas por Fonte" 
          data={chartData} 
          type="pie" 
        />
        <FinancialChart 
          title="Receitas Mensais" 
          data={[
            { name: "Jan", value: 0, color: "#0ea5e9" },
            { name: "Fev", value: 0, color: "#22c55e" },
            { name: "Mar", value: 0, color: "#f59e0b" },
            { name: "Abr", value: 0, color: "#ef4444" },
            { name: "Mai", value: 0, color: "#8b5cf6" },
            { name: "Jun", value: 0, color: "#ec4899" },
          ]} 
          type="bar" 
        />
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
