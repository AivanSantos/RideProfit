
import { useState } from "react";
import DashboardLayout from "@/components/Dashboard/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Save, Users } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    bio: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-gray-600">
          Gerir e atualizar as suas informações pessoais
        </p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Informações Pessoais
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Membros da Família
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize os seus dados pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={profileData.name} 
                        onChange={handleChange}
                        placeholder="Seu nome completo" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={profileData.email} 
                        onChange={handleChange}
                        placeholder="seu.email@exemplo.com" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telemóvel</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={profileData.phone} 
                        onChange={handleChange}
                        placeholder="+351 xxx xxx xxx" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Idade</Label>
                      <Input 
                        id="age" 
                        name="age"
                        type="number" 
                        value={profileData.age} 
                        onChange={handleChange}
                        placeholder="Sua idade" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Morada</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={profileData.address} 
                      onChange={handleChange}
                      placeholder="Sua morada completa" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre Mim</Label>
                    <Input 
                      id="bio" 
                      name="bio"
                      value={profileData.bio} 
                      onChange={handleChange}
                      placeholder="Conte-nos um pouco sobre si" 
                    />
                  </div>

                  <Button 
                    onClick={handleSaveProfile}
                    className="mt-4"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Foto de Perfil</CardTitle>
                <CardDescription>
                  Atualizar a sua imagem de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="" alt="Avatar" />
                  <AvatarFallback className="text-3xl">RP</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="mb-2 w-full">
                  Carregar Imagem
                </Button>
                <Button variant="ghost" className="text-red-500 w-full">
                  Remover Imagem
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="family">
          <Card>
            <CardHeader>
              <CardTitle>Membros da Família</CardTitle>
              <CardDescription>
                Adicione membros da sua família para partilhar despesas e lista de compras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Sem membros familiares adicionados. Adicione até 3 membros da família para partilhar a gestão financeira.
                  </p>
                  
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Adicionar Membro Familiar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Profile;
