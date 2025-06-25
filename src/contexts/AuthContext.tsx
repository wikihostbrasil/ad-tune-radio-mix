
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserPreferences {
  theme: string;
  lang: string;
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  nome?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  preferences: UserPreferences | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  recoverPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth_check.php', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setUser(data.data.user);
          setPreferences(data.data.preferences || null);
        } else {
          setUser(null);
          setPreferences(null);
        }
      } else {
        setUser(null);
        setPreferences(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
      setPreferences(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Atualiza o estado do usuário e preferências imediatamente
        setUser(data.data.user || data.data);
        setPreferences(data.data.preferences || null);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Email ou senha inválidos' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch('/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Erro ao criar conta' };
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout.php', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
      setUser(null);
      navigate('/login');
    }
  };

  const recoverPassword = async (email: string) => {
    try {
      const response = await fetch('/api/recover.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Erro ao recuperar senha' };
      }
    } catch (error) {
      console.error('Erro na recuperação de senha:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await fetch('/api/reset_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token, new_password: newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Erro ao redefinir senha' };
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    preferences,
    loading,
    login,
    register,
    logout,
    recoverPassword,
    resetPassword,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
