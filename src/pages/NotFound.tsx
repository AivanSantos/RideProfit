import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-green-light/20 via-white to-white px-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <h1 className="text-9xl font-display font-bold text-brand-blue/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-brand-blue/10 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o início
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto">
            Tentar novamente
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-brand-blue/5 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
