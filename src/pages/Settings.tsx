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
import { toast } from "sonner";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Save,
  Moon,
  Sun,
  BellRing,
  BellOff
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/SettingsContext";

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLocalSettings(settings);
    setIsLoading(false);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (name: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings(localSettings);
      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações. Por favor, tente novamente.');
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
            <CardTitle>Configurações</CardTitle>
            <CardDescription>
              Gerencie suas preferências e configurações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications" className="space-y-4">
              <TabsList>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Aparência
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Preferências
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Segurança
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações</Label>
                      <p className="text-sm text-gray-500">
                        Receber notificações sobre atualizações e novidades
                      </p>
                    </div>
                    <Switch
                      checked={localSettings.notifications}
                      onCheckedChange={() => handleToggle('notifications')}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Escuro</Label>
                      <p className="text-sm text-gray-500">
                        Alternar entre tema claro e escuro
                      </p>
                    </div>
                    <Switch
                      checked={localSettings.dark_mode}
                      onCheckedChange={() => handleToggle('dark_mode')}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select
                      id="language"
                      name="language"
                      value={localSettings.language}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="pt">Português</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <select
                      id="currency"
                      name="currency"
                      value={localSettings.currency}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="BRL">BRL (R$)</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={localSettings.timezone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="Europe/Lisbon">Lisboa (GMT+0)</option>
                      <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                      <option value="America/New_York">Nova York (GMT-4)</option>
                      <option value="Asia/Tokyo">Tóquio (GMT+9)</option>
                    </select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação em Dois Fatores</Label>
                      <p className="text-sm text-gray-500">
                        Adicionar uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
