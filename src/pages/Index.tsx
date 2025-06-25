
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
        // Se está autenticado, mostra splash e depois vai para /player
        setTimeout(() => {
          navigate("/player", { replace: true });
        }, 4000); // Tempo do splash screen
      } else {
        // Se não está autenticado, vai direto para login
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Mostra splash apenas se estiver autenticado
  if (!loading && user) {
    return <SplashScreen onComplete={() => navigate("/player", { replace: true })} />;
  }

  // Enquanto carrega ou se não autenticado, não mostra nada (vai redirecionar)
  return null;
};

export default Index;
