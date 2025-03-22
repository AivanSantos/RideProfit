import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTransactions } from "@/contexts/TransactionContext";

interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "expense" | "income";
  editingTransaction?: Transaction;
}

const AddTransactionModal = ({
  isOpen,
  onClose,
  type,
  editingTransaction
}: AddTransactionModalProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTransaction, updateTransaction } = useTransactions();

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount.toString());
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const expenseCategories = [
    "Alimentação",
    "Habitação",
    "Transporte",
    "Saúde",
    "Educação",
    "Lazer",
    "Outros",
  ];

  const incomeCategories = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Presente",
    "Outros",
  ];

  const categories = type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category || !date) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Por favor, insira um valor válido.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const transactionData = {
        type,
        description: description.trim(),
        amount: Number(amount),
        category: category.trim(),
        date,
      };

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, transactionData);
        toast.success("Transação atualizada com sucesso!");
      } else {
        await addTransaction(transactionData);
        toast.success(`${type === "expense" ? "Despesa" : "Receita"} adicionada com sucesso!`);
      }
      
      // Reset form
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      
      onClose();
    } catch (error) {
      toast.error(editingTransaction ? "Erro ao atualizar transação." : "Erro ao adicionar transação.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingTransaction ? "Editar" : "Adicionar"} {type === "expense" ? "Despesa" : "Receita"}
          </DialogTitle>
          <DialogDescription>
            {editingTransaction 
              ? `Atualize os detalhes da ${type === "expense" ? "despesa" : "receita"}.`
              : `Preencha os detalhes para adicionar uma nova ${type === "expense" ? "despesa" : "receita"}.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Ex: ${type === "expense" ? "Compras no supermercado" : "Pagamento de salário"}`}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={type === "expense" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isSubmitting 
                ? editingTransaction ? "Atualizando..." : "Adicionando..." 
                : editingTransaction ? "Atualizar" : "Adicionar"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
