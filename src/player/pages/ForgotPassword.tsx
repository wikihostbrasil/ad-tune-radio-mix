
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const PlayerForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio de email
    setTimeout(() => {
      toast.success("E-mail de recuperação enviado!");
      setIsEmailSent(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4">
            <RadioIcon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">
            {isEmailSent ? "E-mail enviado!" : "Recuperar senha"}
          </CardTitle>
          <p className="text-muted-foreground">
            {isEmailSent 
              ? "Verifique sua caixa de entrada e siga as instruções"
              : "Digite seu e-mail para receber instruções de recuperação"
            }
          </p>
        </CardHeader>
        <CardContent>
          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar instruções"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Button 
                onClick={() => setIsEmailSent(false)}
                variant="outline"
                className="w-full"
              >
                Enviar novamente
              </Button>
            </div>
          )}

          <div className="text-center mt-4">
            <Link 
              to="/player/login" 
              className="text-sm text-blue-500 hover:text-blue-600 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar ao login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerForgotPassword;
