import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ShoppingBag, 
  Home, 
  Coffee, 
  Car, 
  Briefcase, 
  Heart, 
  Gift,
  Pencil,
  Trash2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddTransactionModal from "./AddTransactionModal";
import { useTransactions } from "@/contexts/TransactionContext";

interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  title: string;
  showViewAll?: boolean;
}

const categoryIcons: Record<string, any> = {
  "alimentação": ShoppingBag,
  "habitação": Home,
  "lazer": Coffee,
  "transporte": Car,
  "trabalho": Briefcase,
  "saúde": Heart,
  "outros": Gift,
};

const TransactionList = ({ transactions, title, showViewAll = false }: TransactionListProps) => {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { deleteTransaction } = useTransactions();

  const getIcon = (category: string, type: string) => {
    if (type === "income") {
      return ArrowUpCircle;
    }
    
    const lowerCategory = category.toLowerCase();
    return categoryIcons[lowerCategory] || Gift;
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      toast.success("Transação excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir transação.");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
  };

  return (
    <>
      <Card className="shadow-sm hover-lift transition-all duration-500">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {showViewAll && (
              <a href="#" className="text-sm text-primary hover:underline">
                Ver todas
              </a>
            )}
          </div>
          <CardDescription>
            {transactions.length > 0 
              ? `${transactions.length} transações recentes` 
              : "Nenhuma transação encontrada"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Sem transações para mostrar
              </div>
            ) : (
              transactions.map((transaction) => {
                const Icon = getIcon(transaction.category, transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-4 ${
                        transaction.type === "income" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-red-100 text-red-600"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`font-medium ${
                        transaction.type === "income" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(transaction)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(transaction.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {editingTransaction && (
        <AddTransactionModal
          isOpen={!!editingTransaction}
          onClose={handleCloseModal}
          type={editingTransaction.type}
          editingTransaction={editingTransaction}
        />
      )}
    </>
  );
};

export default TransactionList;
