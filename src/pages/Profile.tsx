import { useState, useEffect } from "react";
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
import { User, Save, Users, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    bio: "",
    avatar_url: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) {
        navigate('/login');
        return;
      }

      // Buscar dados do perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
        throw profileError;
      }

      // Atualizar o estado com os dados do usuário e do perfil
      setProfileData({
        name: user.user_metadata.full_name || "",
        email: user.email || "",
        phone: profile?.phone || "",
        age: profile?.age || "",
        address: profile?.address || "",
        bio: profile?.bio || "",
        avatar_url: profile?.avatar_url || ""
      });

      // Se não existir perfil, criar um
      if (!profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            phone: "",
            age: null,
            address: "",
            bio: "",
            avatar_url: ""
          }]);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast.error('Erro ao carregar perfil. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          phone: profileData.phone,
          age: profileData.age ? parseInt(profileData.age) : null,
          address: profileData.address,
          bio: profileData.bio,
          avatar_url: profileData.avatar_url
        });

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      toast.error('Erro ao salvar perfil. Por favor, tente novamente.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfileData(prev => ({
        ...prev,
        avatar_url: publicUrl
      }));

      toast.success('Imagem de perfil atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error('Erro ao fazer upload da imagem. Por favor, tente novamente.');
    }
  };

  const handleRemoveImage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Extrair o nome do arquivo da URL
      const urlParts = profileData.avatar_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `avatars/${fileName}`;

      // Remover o arquivo do storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) throw deleteError;

      // Atualizar o perfil removendo a URL da imagem
      setProfileData(prev => ({
        ...prev,
        avatar_url: ""
      }));

      toast.success('Imagem de perfil removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      toast.error('Erro ao remover imagem. Por favor, tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gerencie suas informações pessoais e preferências
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList>
                <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="family">Família</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar_url} />
                    <AvatarFallback>
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label>Foto de Perfil</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="relative"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Alterar</span>
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                      {profileData.avatar_url && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Remover</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telemóvel</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      placeholder="Seu número de telemóvel"
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
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Morada</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      placeholder="Sua morada completa"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Sobre Mim</Label>
                    <Input
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      placeholder="Conte um pouco sobre você"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="family">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Em Breve</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    A funcionalidade de gerenciamento de família será disponibilizada em breve.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
