import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Dashboard/Layout";
import TransactionList from "@/components/TransactionList";
import { useTransactions } from "@/contexts/TransactionContext";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";
import PieChart3D from "@/components/PieChart3D";

const Reports = () => {
  const navigate = useNavigate();
  const { transactions, isLoading, error, totalIncome, totalExpenses, retryConnection } = useTransactions();

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

  // Preparar dados para os gráficos
  const expensesByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      const category = curr.category;
      acc[category] = (acc[category] || 0) + Number(curr.amount);
      return acc;
    }, {} as Record<string, number>);

  const incomesByCategory = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => {
      const category = curr.category;
      acc[category] = (acc[category] || 0) + Number(curr.amount);
      return acc;
    }, {} as Record<string, number>);

  // Cores para cada categoria
  const categoryColors: Record<string, string> = {
    // Despesas
    "alimentacao": "#FF6B6B", // Vermelho suave
    "transporte": "#4ECDC4", // Verde água
    "moradia": "#45B7D1", // Azul claro
    "saude": "#96CEB4", // Verde menta
    "educacao": "#FFEEAD", // Amarelo suave
    "lazer": "#D4A5A5", // Rosa suave
    "outros": "#9B9B9B", // Cinza
    
    // Receitas
    "salario": "#4CAF50", // Verde
    "investimentos": "#2196F3", // Azul
    "freelance": "#9C27B0", // Roxo
    "bonus": "#FF9800", // Laranja
    "presente": "#E91E63", // Rosa
    "outras_receitas": "#607D8B" // Azul acinzentado
  };

  // Converter dados para o formato do gráfico
  const expenseChartData = Object.entries(expensesByCategory)
    .map(([category, value]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
      value,
      color: categoryColors[category] || "#9B9B9B"
    }))
    .sort((a, b) => b.value - a.value); // Ordenar por valor decrescente

  const incomeChartData = Object.entries(incomesByCategory)
    .map(([category, value]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
      value,
      color: categoryColors[category] || "#9B9B9B"
    }))
    .sort((a, b) => b.value - a.value); // Ordenar por valor decrescente

  if (isLoading) {
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
            <p className="text-red-600 mb-4">
              Erro ao carregar dados: {error instanceof Error ? error.message : String(error)}
            </p>
            {(error instanceof Error && 
              (error.message.includes("Failed to fetch") || 
               error.message.includes("ERR_INTERNET_DISCONNECTED") ||
               error.message.includes("ERR_NAME_NOT_RESOLVED"))) && (
              <button
                onClick={() => retryConnection()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Tentar Reconectar
              </button>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Relatórios</h1>
        <p className="text-gray-600">
          Análise detalhada das suas finanças
        </p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Receitas Totais</h2>
          <p className="text-2xl text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Despesas Totais</h2>
          <p className="text-2xl text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <PieChart3D data={expenseChartData} title="Despesas por Categoria" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <PieChart3D data={incomeChartData} title="Receitas por Categoria" />
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-lg shadow-sm">
        <TransactionList 
          transactions={transactions} 
          title="Todas as Transações" 
        />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
