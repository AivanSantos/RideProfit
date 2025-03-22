import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, ArrowLeft, PlusCircle, MinusCircle, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [familyMembers, setFamilyMembers] = useState([{ name: "", relation: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleAddFamilyMember = () => {
    if (familyMembers.length < 3) {
      setFamilyMembers([...familyMembers, { name: "", relation: "" }]);
    } else {
      toast.warning("Pode adicionar até 3 membros da família.");
    }
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFamilyMembers(updatedMembers);
  };

  const validateStep1 = () => {
    if (!fullName.trim()) {
      toast.error("Por favor, introduza o seu nome completo.");
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Por favor, introduza um email válido.");
      return false;
    }
    
    if (password.length < 8) {
      toast.error("A palavra-passe deve ter pelo menos 8 caracteres.");
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error("As palavras-passe não coincidem.");
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }

      await signUp(email, password);
      toast.success("Conta criada com sucesso! Verifique seu email.");
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
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
            <CardTitle className="text-2xl font-bold text-center">Criar uma conta</CardTitle>
            <CardDescription className="text-center">
              {step === 1 
                ? "Introduza os seus dados para criar uma conta" 
                : "Adicione os membros da sua família (opcional)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={fullName}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      autoComplete="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                  </div>
                  <Button 
                    type="button" 
                    className="w-full h-12 text-base font-medium"
                    onClick={handleNextStep}
                  >
                    Continuar
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Membros da Família (Opcional)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleAddFamilyMember}
                        disabled={familyMembers.length >= 3}
                        className="h-8 px-2"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        <span>Adicionar</span>
                      </Button>
                    </div>
                    
                    {familyMembers.map((member, index) => (
                      <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-md relative">
                        <div className="absolute top-2 right-2">
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFamilyMember(index)}
                              className="h-6 w-6 p-0"
                            >
                              <MinusCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-5 w-5 text-primary" />
                          <span className="font-medium">Membro {index + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`name-${index}`}>Nome</Label>
                            <Input
                              id={`name-${index}`}
                              value={member.name}
                              onChange={(e) => handleFamilyMemberChange(index, "name", e.target.value)}
                              placeholder="Nome"
                              className="h-10"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`relation-${index}`}>Relação</Label>
                            <Input
                              id={`relation-${index}`}
                              value={member.relation}
                              onChange={(e) => handleFamilyMemberChange(index, "relation", e.target.value)}
                              placeholder="Ex: Cônjuge"
                              className="h-10"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1 h-12"
                      onClick={handlePrevStep}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 h-12"
                      disabled={isLoading}
                    >
                      {isLoading ? "A processar..." : "Criar Conta"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
