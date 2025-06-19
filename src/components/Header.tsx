import { useState, useEffect } from "react";
import { RadioIcon, User, Settings, Lock, LogOut, Sun, Moon, Code, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "@/components/ProfileModal";
import { PasswordModal } from "@/components/PasswordModal";
import { ConfigurationsModal } from "@/components/ConfigurationsModal";
import { useLogo } from "@/hooks/useLogo";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfigurations, setShowConfigurations] = useState(false);
  const { logoUrl } = useLogo();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize theme based on current state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const handleDevelopersClick = () => {
    navigate('/developers');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-6">
          {/* Logo e Nome da Rádio */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <RadioIcon className="w-5 h-5 text-white hidden" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Rádio Mix FM</h1>
              <Badge variant="secondary" className="text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1 animate-pulse"></div>
                No Ar
              </Badge>
            </div>
          </div>

          {/* Avatar e Controles */}
          <div className="flex items-center space-x-3">
            {/* Botão Upgrade */}
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-500 hover:from-blue-600 hover:to-blue-800"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Upgrade
            </Button>

            {/* Toggle Tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Dropdown do Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-blue-500 text-white">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@radiomix.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowProfile(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowPassword(true)}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Alterar Senha</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setShowConfigurations(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleDevelopersClick}>
                  <Code className="mr-2 h-4 w-4" />
                  <span>Desenvolvedores</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <PasswordModal isOpen={showPassword} onClose={() => setShowPassword(false)} />
      <ConfigurationsModal isOpen={showConfigurations} onClose={() => setShowConfigurations(false)} />
    </>
  );
};
