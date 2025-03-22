import { supabase } from "@/lib/supabase";

export interface Transaction {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  created_at: string;
}

export const transactionService = {
  async getTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  async createTransaction(transaction: Omit<Transaction, "id" | "user_id" | "created_at">) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          ...transaction,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  async deleteTransaction(id: string) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async updateTransaction(id: string, transaction: Partial<Transaction>) {
    const { data, error } = await supabase
      .from("transactions")
      .update(transaction)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  async getTransactionsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  async getTransactionsByCategory(category: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("category", category)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  async getTransactionsByType(type: "income" | "expense") {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("type", type)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },
}; 