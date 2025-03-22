import { useSettings } from "@/contexts/SettingsContext";

export function useCurrency() {
  const { settings } = useSettings();

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: settings.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  return { formatCurrency };
} 