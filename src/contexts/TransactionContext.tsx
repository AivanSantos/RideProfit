import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserAndFetch = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }
        await fetchTransactions();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao verificar usuário');
        setLoading(false);
      }
    };

    checkUserAndFetch();

    // Inscrever-se para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchTransactions();
      } else {
        setTransactions([]);
        setError('Usuário não autenticado');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          ...transaction,
          user_id: user.id,
        }])
        .select('*')
        .single();

      if (error) throw error;
      if (!data) throw new Error('Nenhum dado retornado após inserção');

      setTransactions(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      throw error;
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        loading,
        error,
        totalIncome,
        totalExpense,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionProvider');
  }
  return context;
} 