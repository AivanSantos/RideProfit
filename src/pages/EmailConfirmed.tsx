import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmailConfirmed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Email Confirmado!</h1>
        <p className="text-muted-foreground mb-8">
          Sua conta foi confirmada com sucesso. Agora você pode fazer login e começar a usar o RideProfit.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  );
} 