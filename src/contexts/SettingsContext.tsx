import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface Settings {
  notifications: boolean;
  dark_mode: boolean;
  language: string;
  currency: string;
  timezone: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  formatCurrency: (value: number) => string;
  formatDate: (date: Date) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const currencySymbols: Record<string, string> = {
  'EUR': '€',
  'USD': '$',
  'GBP': '£',
  'BRL': 'R$'
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    dark_mode: false,
    language: 'pt',
    currency: 'EUR',
    timezone: 'Europe/Lisbon'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (userSettings) {
        setSettings(userSettings);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updatedSettings = { ...settings, ...newSettings };
      
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...updatedSettings
        });

      if (error) throw error;
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
    }
  };

  const formatCurrency = (value: number) => {
    const symbol = currencySymbols[settings.currency] || settings.currency;
    return `${symbol} ${value.toFixed(2)}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: settings.timezone,
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, formatCurrency, formatDate }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
} 