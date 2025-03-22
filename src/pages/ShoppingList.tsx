import { useState } from "react";
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
import { useShoppingList } from "@/contexts/ShoppingListContext";

interface NewShoppingItem {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  completed: boolean;
}

const ShoppingList = () => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemUnit, setNewItemUnit] = useState("unidade");
  const [newItemCategory, setNewItemCategory] = useState("Geral");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<NewShoppingItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    items,
    addItem,
    updateItem,
    deleteItem,
    loading,
    error
  } = useShoppingList();

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      toast.error("Por favor, insira o nome do item.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newItem: NewShoppingItem = {
        name: newItemName,
        quantity: parseInt(newItemQuantity) || 1,
        unit: newItemUnit,
        category: newItemCategory,
        completed: false,
      };
      
      await addItem(newItem);
      toast.success("Item adicionado com sucesso!");
      
      // Reset form
      setNewItemName("");
      setNewItemQuantity("1");
      setNewItemUnit("unidade");
      setNewItemCategory("Geral");
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao adicionar item.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = async () => {
    if (!currentItem) return;
    
    if (!currentItem.name.trim()) {
      toast.error("Por favor, insira o nome do item.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updateItem(currentItem.id, currentItem);
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

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Item removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover item.");
      console.error(error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const item = items.find(i => i.id === id);
      if (item) {
        await updateItem(id, { ...item, completed: !item.completed });
      }
    } catch (error) {
      toast.error("Erro ao atualizar item.");
      console.error(error);
    }
  };

  const handleEditClick = (item: NewShoppingItem & { id: string }) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const shareList = () => {
    toast.success("Lista partilhada com a família!");
  };

  const clearCompletedItems = async () => {
    try {
      const completedItems = items.filter(item => item.completed);
      await Promise.all(completedItems.map(item => deleteItem(item.id)));
      toast.success("Itens concluídos removidos com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover itens concluídos.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando lista de compras...</p>
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
            <p className="text-red-600">Erro ao carregar dados: {error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} - {item.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditClick(item)}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Item</DialogTitle>
            <DialogDescription>
              Adicione um novo item à sua lista de compras
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Item</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Ex: Leite"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="unit">Unidade</Label>
              <Input
                id="unit"
                value={newItemUnit}
                onChange={(e) => setNewItemUnit(e.target.value)}
                placeholder="Ex: unidade, kg, litro"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                placeholder="Ex: Laticínios, Frutas, Limpeza"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddItem}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adicionando..." : "Adicionar Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
            <DialogDescription>
              Modifique os detalhes do item
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome do Item</Label>
                <Input
                  id="edit-name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-quantity">Quantidade</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="edit-unit">Unidade</Label>
                <Input
                  id="edit-unit"
                  value={currentItem.unit}
                  onChange={(e) => setCurrentItem({ ...currentItem, unit: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Categoria</Label>
                <Input
                  id="edit-category"
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setCurrentItem(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditItem}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ShoppingList;
