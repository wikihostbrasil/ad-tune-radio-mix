
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { useLoadingState } from "@/hooks/useLoadingState";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Painel from "./pages/Painel";
import Developers from "./pages/Developers";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Stream from "./pages/Stream";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { showSplash, handleSplashComplete } = useLoadingState({
    initialDelay: 1000,
    minLoadingTime: 4000
  });

  // Show splash only on main page and painel
  if ((location.pathname === "/" || location.pathname === "/painel") && showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/painel" element={
        <ProtectedRoute>
          <Painel />
        </ProtectedRoute>
      } />
      <Route path="/developers" element={<Developers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-senha" element={<ForgotPassword />} />
      <Route path="/criar-conta" element={<SignUp />} />
      <Route path="/stream" element={<Stream />} />
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
