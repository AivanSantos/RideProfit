import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function getRandomColor(): string {
  const colors = [
    '#0ea5e9', // blue
    '#22c55e', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#10b981', // emerald
    '#f97316', // orange
    '#6366f1', // indigo
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

export function generateRandomData(categories: string[], count = 5) {
  // Return zeroed data
  return categories.slice(0, count).map(category => ({
    name: category,
    value: 0,
    color: getRandomColor(),
  }));
}

export function generateRandomTransactions(count: number, type: 'expense' | 'income' | 'all' = 'all') {
  // Return empty transactions array - keeping the function to maintain API compatibility
  return [];
}

// Transaction ID generator
export function generateTransactionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Calculate percentage change between two values
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return Math.round(((newValue - oldValue) / Math.abs(oldValue)) * 100);
}

// Group transactions by category
export function groupByCategory(transactions: any[], type: 'expense' | 'income') {
  const filtered = transactions.filter(t => t.type === type);
  const grouped: Record<string, number> = {};
  
  filtered.forEach(transaction => {
    const category = transaction.category;
    grouped[category] = (grouped[category] || 0) + transaction.amount;
  });
  
  return grouped;
}

// Group transactions by month
export function groupByMonth(transactions: any[], year = new Date().getFullYear()) {
  const monthly: Record<number, number> = {};
  
  // Initialize all months with zero
  for (let i = 0; i < 12; i++) {
    monthly[i] = 0;
  }
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    if (date.getFullYear() === year) {
      const month = date.getMonth();
      monthly[month] = (monthly[month] || 0) + transaction.amount;
    }
  });
  
  return monthly;
}
