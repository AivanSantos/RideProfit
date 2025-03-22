import { supabase } from "@/lib/supabase";

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  scheduled_date: string;
  is_read: boolean;
  created_at: string;
}

export const notificationService = {
  async getNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  async createNotification(message: string, scheduledDate: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: user.id,
          message,
          scheduled_date: scheduledDate,
          is_read: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Notification;
  },

  async deleteNotification(id: string) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
  },

  async checkScheduledNotifications() {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("is_read", false)
      .lte("scheduled_date", now);

    if (error) throw error;
    return data as Notification[];
  },
}; 