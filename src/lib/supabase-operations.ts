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

async function checkAuth() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Erro ao verificar autenticação:", error);
    throw new Error("Erro ao verificar autenticação");
  }
  if (!session) {
    throw new Error("Usuário não autenticado");
  }
  return session.user;
}

export async function addTransaction(transaction: Omit<Transaction, "id" | "created_at">) {
  try {
    const user = await checkAuth();
    console.log("Adicionando transação:", transaction);

    const { data, error } = await supabase
      .from("transactions")
      .insert([{ ...transaction, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar transação:", error);
      if (error.code === "42501") {
        throw new Error("Sem permissão para adicionar transação");
      }
      throw error;
    }

    console.log("Transação adicionada com sucesso:", data);
    return data;
  } catch (error) {
    console.error("Erro inesperado ao adicionar transação:", error);
    throw error;
  }
}

export async function getTransactions(userId: string) {
  try {
    await checkAuth();
    console.log("Buscando transações para o usuário:", userId);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      console.error("Erro ao buscar transações:", error);
      if (error.code === "42501") {
        throw new Error("Sem permissão para visualizar transações");
      }
      throw error;
    }

    console.log("Transações encontradas:", data?.length || 0);
    return data || [];
  } catch (error) {
    console.error("Erro inesperado ao buscar transações:", error);
    throw error;
  }
}

export async function deleteTransaction(id: string) {
  try {
    await checkAuth();
    console.log("Removendo transação:", id);

    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao remover transação:", error);
      if (error.code === "42501") {
        throw new Error("Sem permissão para remover transação");
      }
      throw error;
    }

    console.log("Transação removida com sucesso");
  } catch (error) {
    console.error("Erro inesperado ao remover transação:", error);
    throw error;
  }
}

export async function getTransactionStats(userId: string) {
  try {
    await checkAuth();
    console.log("Buscando estatísticas para o usuário:", userId);

    const { data, error } = await supabase
      .from("transactions")
      .select("type, amount")
      .eq("user_id", userId);

    if (error) {
      console.error("Erro ao buscar estatísticas:", error);
      if (error.code === "42501") {
        throw new Error("Sem permissão para visualizar estatísticas");
      }
      throw error;
    }

    const stats = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
    };

    data?.forEach((transaction) => {
      if (transaction.type === "income") {
        stats.totalIncome += transaction.amount;
      } else {
        stats.totalExpenses += transaction.amount;
      }
    });

    stats.balance = stats.totalIncome - stats.totalExpenses;

    console.log("Estatísticas calculadas:", stats);
    return stats;
  } catch (error) {
    console.error("Erro inesperado ao buscar estatísticas:", error);
    throw error;
  }
} 