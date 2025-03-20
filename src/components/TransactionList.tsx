
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
  Gift 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "expense" | "income";
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
  const getIcon = (category: string, type: string) => {
    if (type === "income") {
      return ArrowUpCircle;
    }
    
    const lowerCategory = category.toLowerCase();
    return categoryIcons[lowerCategory] || Gift;
  };

  return (
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
                        {transaction.date} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === "income" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
