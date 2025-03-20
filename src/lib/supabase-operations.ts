import { supabase } from "./supabase";

export interface Transaction {
  id: string;
  user_id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  created_at: string;
}

export async function addTransaction(transaction: Omit<Transaction, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTransactions(userId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getTransactionStats(userId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("type, amount")
    .eq("user_id", userId);

  if (error) throw error;

  const stats = {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  };

  data.forEach((transaction) => {
    if (transaction.type === "income") {
      stats.totalIncome += transaction.amount;
    } else {
      stats.totalExpenses += transaction.amount;
    }
  });

  stats.balance = stats.totalIncome - stats.totalExpenses;

  return stats;
} 