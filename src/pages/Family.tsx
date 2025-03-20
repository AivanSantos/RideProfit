
import { useState } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { 
  UserPlus, 
  Mail, 
  Trash2, 
  Edit, 
  Users,
  UserCheck 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Family = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    relationship: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRelationshipChange = (value: string) => {
    setNewMember(prev => ({
      ...prev,
      relationship: value
    }));
  };

  const handleAddMember = () => {
    if (members.length >= 3) {
      toast.error("Limite máximo de 3 membros atingido.");
      return;
    }

    if (!newMember.name || !newMember.email || !newMember.relationship) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setInvites([...invites, { ...newMember, id: Date.now().toString() }]);
    setNewMember({ name: "", email: "", relationship: "" });
    toast.success("Convite enviado com sucesso!");
  };

  const handleCancelInvite = (id: string) => {
    setInvites(invites.filter(invite => invite.id !== id));
    toast.success("Convite cancelado.");
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Membro removido com sucesso.");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Gestão Familiar</h1>
        <p className="text-gray-600">
          Adicione membros da família para partilhar e gerir finanças em conjunto
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Membros da Família
            </CardTitle>
            <CardDescription>
              Gerencie os membros da sua família (máximo 3 membros)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
              <div className="border rounded-lg p-6 text-center">
                <p className="text-gray-500 mb-4">
                  Sem membros familiares adicionados. Convide até 3 membros para a sua família.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Adicionar Membro Familiar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Membro Familiar</DialogTitle>
                      <DialogDescription>
                        Adicione um membro da sua família para partilhar despesas e gestão financeira.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={newMember.name}
                          onChange={handleInputChange}
                          placeholder="Nome do membro familiar" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={newMember.email}
                          onChange={handleInputChange}
                          placeholder="email@exemplo.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relação</Label>
                        <Select
                          value={newMember.relationship}
                          onValueChange={handleRelationshipChange}
                        >
                          <SelectTrigger id="relationship">
                            <SelectValue placeholder="Selecione a relação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Cônjuge</SelectItem>
                            <SelectItem value="child">Filho(a)</SelectItem>
                            <SelectItem value="parent">Pai/Mãe</SelectItem>
                            <SelectItem value="sibling">Irmão/Irmã</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddMember}>Enviar Convite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-400">
                          {member.relationship === "spouse" ? "Cônjuge" : 
                           member.relationship === "child" ? "Filho(a)" :
                           member.relationship === "parent" ? "Pai/Mãe" :
                           member.relationship === "sibling" ? "Irmão/Irmã" : "Outro"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {members.length < 3 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar Outro Membro
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Membro Familiar</DialogTitle>
                        <DialogDescription>
                          Adicione um membro da sua família para partilhar despesas e gestão financeira.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={newMember.name}
                            onChange={handleInputChange}
                            placeholder="Nome do membro familiar" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={newMember.email}
                            onChange={handleInputChange}
                            placeholder="email@exemplo.com" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relação</Label>
                          <Select
                            value={newMember.relationship}
                            onValueChange={handleRelationshipChange}
                          >
                            <SelectTrigger id="relationship">
                              <SelectValue placeholder="Selecione a relação" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="spouse">Cônjuge</SelectItem>
                              <SelectItem value="child">Filho(a)</SelectItem>
                              <SelectItem value="parent">Pai/Mãe</SelectItem>
                              <SelectItem value="sibling">Irmão/Irmã</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddMember}>Enviar Convite</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Convites Pendentes
            </CardTitle>
            <CardDescription>
              Convites enviados à espera de aceitação
            </CardDescription>
          </CardHeader>
          <CardContent>
            {invites.length === 0 ? (
              <p className="text-gray-500 text-center">Sem convites pendentes</p>
            ) : (
              <div className="space-y-3">
                {invites.map(invite => (
                  <div key={invite.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{invite.name}</p>
                        <p className="text-sm text-gray-500">{invite.email}</p>
                        <p className="text-xs text-gray-400 mt-1">Enviado há 2 dias</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleCancelInvite(invite.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {invites.length > 0 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                Reenviar Todos os Convites
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Partilha de Despesas
          </CardTitle>
          <CardDescription>
            Gerencie como as despesas são partilhadas entre os membros da família
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 text-center">
            <p className="text-gray-500">
              Quando adicionar membros à sua família, poderá configurar como as despesas são partilhadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Family;
