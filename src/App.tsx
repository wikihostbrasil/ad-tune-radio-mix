
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Site pages
import Landing from "./site/pages/Landing";

// Player pages
import PlayerLogin from "./player/pages/Login";
import PlayerSignUp from "./player/pages/SignUp";
import PlayerForgotPassword from "./player/pages/ForgotPassword";
import Painel from "./pages/Painel"; // Mantém o player original

// Painel pages
import PainelLogin from "./painel/pages/Login";
import PainelDashboard from "./painel/pages/Dashboard";

// Shared pages
import Stream from "./pages/Stream";
import Developers from "./pages/Developers";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      {/* Site routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/site" element={<Landing />} />
      
      {/* Player routes */}
      <Route path="/player/login" element={<PlayerLogin />} />
      <Route path="/player/criar-conta" element={<PlayerSignUp />} />
      <Route path="/player/recuperar-senha" element={<PlayerForgotPassword />} />
      <Route path="/player" element={
        <ProtectedRoute>
          <Painel />
        </ProtectedRoute>
      } />
      
      {/* Painel routes */}
      <Route path="/painel/login" element={<PainelLogin />} />
      <Route path="/painel" element={
        <ProtectedRoute>
          <PainelDashboard />
        </ProtectedRoute>
      } />
      
      {/* Shared routes */}
      <Route path="/stream" element={<Stream />} />
      <Route path="/developers" element={<Developers />} />
      
      {/* Legacy routes for backward compatibility */}
      <Route path="/login" element={<PlayerLogin />} />
      <Route path="/criar-conta" element={<PlayerSignUp />} />
      <Route path="/recuperar-senha" element={<PlayerForgotPassword />} />
      
      {/* Error routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
