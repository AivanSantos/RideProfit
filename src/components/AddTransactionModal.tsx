import { useState } from "react";
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

interface NewTransaction {
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: NewTransaction) => void;
  type: "expense" | "income";
}

const AddTransactionModal = ({
  isOpen,
  onClose,
  onAddTransaction,
  type,
}: AddTransactionModalProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
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
      const newTransaction: NewTransaction = {
        type,
        description: description.trim(),
        amount: Number(amount),
        category: category.trim(),
        date,
      };
      
      onAddTransaction(newTransaction);
      toast.success(`${type === "expense" ? "Despesa" : "Receita"} adicionada com sucesso!`);
      
      // Reset form
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      
      onClose();
    } catch (error) {
      toast.error("Erro ao adicionar transação.");
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
            Adicionar {type === "expense" ? "Despesa" : "Receita"}
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes para adicionar uma nova {type === "expense" ? "despesa" : "receita"}.
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
            <Label htmlFor="amount">Valor (€)</Label>
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
              {isSubmitting ? "A adicionar..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
