import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botão quando rolar 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Função para rolar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 animate-fadeIn">
          <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full h-12 w-12 shadow-lg bg-brand-blue hover:bg-brand-blue-light transition-colors duration-300"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop; 