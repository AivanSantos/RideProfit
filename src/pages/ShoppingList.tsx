
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  Share2, 
  Archive
} from "lucide-react";
import { toast } from "sonner";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ShoppingItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // This would be a data fetch in a real app
    const mockItems: ShoppingItem[] = [
      { id: "1", name: "Leite", quantity: "2 litros", completed: false },
      { id: "2", name: "Pão", quantity: "1 pacote", completed: true },
      { id: "3", name: "Queijo", quantity: "200g", completed: false },
      { id: "4", name: "Maçãs", quantity: "1kg", completed: false },
      { id: "5", name: "Detergente", quantity: "1 garrafa", completed: true },
    ];
    
    setItems(mockItems);
  }, []);

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast.error("Por favor, insira o nome do item.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newItem: ShoppingItem = {
        id: Math.random().toString(36).substring(2, 9),
        name: newItemName,
        quantity: newItemQuantity || "1",
        completed: false,
      };
      
      setItems([...items, newItem]);
      toast.success("Item adicionado com sucesso!");
      
      // Reset form
      setNewItemName("");
      setNewItemQuantity("");
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao adicionar item.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = () => {
    if (!currentItem) return;
    
    if (!currentItem.name.trim()) {
      toast.error("Por favor, insira o nome do item.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const updatedItems = items.map(item => 
        item.id === currentItem.id ? currentItem : item
      );
      
      setItems(updatedItems);
      toast.success("Item atualizado com sucesso!");
      
      setIsEditDialogOpen(false);
      setCurrentItem(null);
    } catch (error) {
      toast.error("Erro ao atualizar item.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    try {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      toast.success("Item removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover item.");
      console.error(error);
    }
  };

  const handleToggleComplete = (id: string) => {
    try {
      const updatedItems = items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      
      setItems(updatedItems);
    } catch (error) {
      toast.error("Erro ao atualizar item.");
      console.error(error);
    }
  };

  const handleEditClick = (item: ShoppingItem) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const shareList = () => {
    toast.success("Lista partilhada com a família!");
  };

  const clearCompletedItems = () => {
    try {
      const updatedItems = items.filter(item => !item.completed);
      setItems(updatedItems);
      toast.success("Itens concluídos removidos com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover itens concluídos.");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Lista de Compras</h1>
        <p className="text-gray-600">
          Gerencie a sua lista de compras para o supermercado
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="hover-lift"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
        <Button 
          variant="outline" 
          onClick={shareList}
          className="hover-lift"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Partilhar com Família
        </Button>
        {items.some(item => item.completed) && (
          <Button 
            variant="outline" 
            onClick={clearCompletedItems}
            className="hover-lift"
          >
            <Archive className="h-4 w-4 mr-2" />
            Limpar Concluídos
          </Button>
        )}
      </div>

      {/* Shopping List */}
      <Card className="hover-lift transition-all duration-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            <span>Sua Lista de Compras</span>
            <span className="text-sm font-normal text-gray-500">
              {items.filter(item => item.completed).length}/{items.length} itens concluídos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Sua lista de compras está vazia. Adicione alguns itens!
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-lg border flex items-center justify-between ${
                    item.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => handleToggleComplete(item.id)}
                    />
                    <div className={`space-y-1 ${item.completed ? "line-through text-gray-500" : ""}`}>
                      <Label 
                        htmlFor={`item-${item.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {item.name}
                      </Label>
                      {item.quantity && (
                        <p className="text-sm text-gray-500">
                          {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditClick(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteItem(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Item à Lista de Compras</DialogTitle>
            <DialogDescription>
              Adicione um novo item à sua lista de compras.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Item</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Ex: Leite, Pão, etc."
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade (opcional)</Label>
              <Input
                id="quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                placeholder="Ex: 1kg, 2 litros, etc."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddItem}
              disabled={isSubmitting}
            >
              {isSubmitting ? "A adicionar..." : "Adicionar Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Item da Lista de Compras</DialogTitle>
            <DialogDescription>
              Edite os detalhes do item selecionado.
            </DialogDescription>
          </DialogHeader>
          
          {currentItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Item</Label>
                <Input
                  id="edit-name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="Ex: Leite, Pão, etc."
                  autoFocus
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantidade (opcional)</Label>
                <Input
                  id="edit-quantity"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                  placeholder="Ex: 1kg, 2 litros, etc."
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditItem}
              disabled={isSubmitting}
            >
              {isSubmitting ? "A atualizar..." : "Guardar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ShoppingList;
