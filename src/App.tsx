
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { useLoadingState } from "@/hooks/useLoadingState";
import Index from "./pages/Index";
import Developers from "./pages/Developers";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Stream from "./pages/Stream";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { showSplash, handleSplashComplete } = useLoadingState({
    initialDelay: 500,
    minLoadingTime: 2500
  });

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-senha" element={<ForgotPassword />} />
            <Route path="/criar-conta" element={<SignUp />} />
            <Route path="/stream" element={<Stream />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
