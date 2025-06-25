
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Se está autenticado, não redireciona imediatamente - deixa o splash aparecer
        // O splash irá redirecionar após 4 segundos
      } else {
        // Se não está autenticado, vai direto para login
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Enquanto carrega, não mostra nada
  if (loading) {
    return null;
  }

  // Se autenticado, mostra splash que depois redireciona para /player
  if (user) {
    return <SplashScreen onComplete={() => navigate("/player", { replace: true })} />;
  }

  // Se não autenticado, não mostra nada (vai redirecionar)
  return null;
};

export default Index;
