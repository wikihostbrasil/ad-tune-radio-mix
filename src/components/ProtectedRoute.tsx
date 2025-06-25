
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, checkAuth } = useAuth();

  // Revalida autenticação periodicamente para detectar alterações no devtools
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        // Só revalida se o usuário ainda estiver ativo na página
        if (document.visibilityState === 'visible') {
          checkAuth().catch((error) => {
            // Se houver erro na verificação, não force logout imediatamente
            console.log('Erro na revalidação automática:', error);
          });
        }
      }
    }, 60000); // Aumentado para 60 segundos para ser menos agressivo

    return () => clearInterval(interval);
  }, [user, checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
