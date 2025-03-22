import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from "sonner";
import { Transaction } from "@/lib/supabase-operations";
import { useAuth } from './AuthContext';

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  addTransaction: (transaction: Omit<Transaction, "id" | "user_id">) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  retryConnection: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const { user, loading: authLoading } = useAuth();

  const fetchTransactions = async () => {
    try {
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      console.log("Buscando transações para o usuário:", user.id);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("Transações encontradas:", data?.length || 0);
      setTransactions(data || []);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
      setError(err instanceof Error ? err : new Error("Erro ao buscar transações"));
      
      // Tentar reconectar se houver erro de rede
      if (err instanceof Error && 
          (err.message.includes("Failed to fetch") || 
           err.message.includes("ERR_INTERNET_DISCONNECTED") ||
           err.message.includes("ERR_NAME_NOT_RESOLVED"))) {
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchTransactions();
          }, 2000 * (retryCount + 1)); // Espera progressiva: 2s, 4s, 6s
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchTransactions();
    }
  }, [user, authLoading, retryCount]);

  const addTransaction = async (transaction: Omit<Transaction, "id" | "user_id">) => {
    try {
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setTransactions((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
      throw err;
    }
  };

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .update(transaction)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? data : t))
      );
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
      throw err;
    }
  };

  const retryConnection = async () => {
    setRetryCount(0);
    setIsLoading(true);
    await fetchTransactions();
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, curr) => sum + Number(curr.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, curr) => sum + Number(curr.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error,
        totalIncome,
        totalExpenses,
        balance,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        retryConnection
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions deve ser usado dentro de um TransactionProvider");
  }
  return context;
} 