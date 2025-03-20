import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (!isHomePage) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12 lg:px-24",
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="RideProfit Logo" 
            className="h-12 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a
            href="#funcionalidades"
            className="text-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Funcionalidades
          </a>
          <a
            href="#como-funciona"
            className="text-foreground/80 hover:text-primary transition-colors font-medium"
          >
            Como Funciona
          </a>
          <Link to="/login">
            <Button variant="outline" className="hover-lift">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button className="hover-lift bg-primary hover:bg-primary/90">
              Registrar
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg animate-slideInFromTop">
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="#funcionalidades"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={closeMobileMenu}
            >
              Funcionalidades
            </a>
            <a
              href="#como-funciona"
              className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              onClick={closeMobileMenu}
            >
              Como Funciona
            </a>
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <Button className="w-full">Registrar</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
