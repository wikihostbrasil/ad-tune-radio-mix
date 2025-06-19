
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recuperar senha:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4">
            <RadioIcon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Recuperar senha</CardTitle>
          <p className="text-muted-foreground">
            {!submitted 
              ? "Digite seu e-mail para receber instruções de recuperação"
              : "Instruções enviadas para seu e-mail"
            }
          </p>
        </CardHeader>
        <CardContent>
          {!submitted ? (
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
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              >
                Enviar instruções
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Se o e-mail estiver cadastrado, você receberá as instruções em breve.
              </p>
              <Button 
                onClick={() => setSubmitted(false)}
                variant="outline" 
                className="w-full"
              >
                Tentar novamente
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-blue-500 hover:text-blue-600 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
