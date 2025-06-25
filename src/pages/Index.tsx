
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
        // Se já está autenticado e acessou a raiz, vai direto para /player sem splash
        navigate("/player", { replace: true });
      } else {
        // Se não está autenticado, vai para login
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  // Não mostra splash aqui - só após login bem-sucedido
  return null;
};

export default Index;
