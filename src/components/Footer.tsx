import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="RideProfit Logo"
              className="h-16 w-auto"
            />
            <p className="text-sm text-foreground/70">
              Gerencie suas finanças com facilidade e segurança.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-foreground/70 hover:text-primary">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-foreground/70 hover:text-primary">
                  Criar Conta
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-foreground/70 hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-foreground/70 hover:text-primary">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-foreground/70 hover:text-primary">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gdpr" className="text-sm text-foreground/70 hover:text-primary">
                  GDPR
                </Link>
              </li>
              <li>
                <a href="mailto:suporte@rideprofit.com" className="text-sm text-foreground/70 hover:text-primary">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/70">
          <p>&copy; {new Date().getFullYear()} RideProfit. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 