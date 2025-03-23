import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) throw error;

        toast.success("Email de redefinição de senha enviado!");
        setIsResetMode(false);
        setFormData({
          email: "",
          password: "",
        });
      } else {
        await signIn(formData.email, formData.password);
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error(
        isResetMode
          ? "Erro ao enviar email de redefinição de senha"
          : "Email ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-green-light/20 via-white to-white px-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Voltar para o início</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full shadow-xl animate-fadeIn">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img 
                src="/logo.png" 
                alt="RideProfit Logo" 
                className="h-12 w-auto mb-2" 
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isResetMode ? "Redefinir Senha" : "Bem-vindo de volta"}
            </CardTitle>
            <CardDescription className="text-center">
              {isResetMode
                ? "Digite seu email para receber as instruções"
                : "Faça login para acessar sua conta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>
              {!isResetMode && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>
                    {isResetMode ? "Enviando..." : "Entrando..."}
                  </div>
                ) : isResetMode ? (
                  "Enviar Instruções"
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {!isResetMode && (
              <>
                <div className="text-center text-sm">
                  Não tem uma conta?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Crie uma agora
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Esqueceu sua senha?{" "}
                  <button
                    onClick={() => setIsResetMode(true)}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Redefinir senha
                  </button>
                </div>
              </>
            )}
            {isResetMode && (
              <div className="text-center text-sm">
                <button
                  onClick={() => setIsResetMode(false)}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Voltar para o login
                </button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
