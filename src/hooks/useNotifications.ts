import { useEffect } from "react";
import { notificationService } from "@/services/notificationService";
import { toast } from "sonner";

export const useNotifications = () => {
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const notifications = await notificationService.checkScheduledNotifications();
        notifications.forEach((notification) => {
          toast.info(notification.message, {
            duration: 5000,
            position: "top-right",
          });
        });
      } catch (error) {
        console.error("Erro ao verificar notificações:", error);
      }
    };

    // Verifica imediatamente
    checkNotifications();

    // Verifica a cada minuto
    const interval = setInterval(checkNotifications, 60000);

    return () => clearInterval(interval);
  }, []);
}; 