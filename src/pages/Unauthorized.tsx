
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 text-center">
        <CardHeader>
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Acesso Negado</CardTitle>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/painel">Voltar ao Painel</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
