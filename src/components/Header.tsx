
import { useState, useEffect } from "react";
import { RadioIcon, User, Settings, Lock, LogOut, Sun, Moon, Code, ArrowUp, Bell, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import { VehicleManager } from "@/components/VehicleManager";
import { useLogo } from "@/hooks/useLogo";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export const Header = ({ selectedColor, setSelectedColor }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfigurations, setShowConfigurations] = useState(false);
  const [showVehicleManager, setShowVehicleManager] = useState(false);
  const [isVehiclePlaying, setIsVehiclePlaying] = useState(false);
  const { logoUrl } = useLogo();
  const { user, logout } = useAuth();
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

  const handleVehiclePlayToggle = () => {
    setIsVehiclePlaying(!isVehiclePlaying);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="h-full flex items-center justify-between px-4">
          {/* Logo e Nome da Rádio */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <img 
                src={logoUrl || "https://placehold.co/40x40/0066FF/FFFFFF?text=LOGO"} 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/40x40/0066FF/FFFFFF?text=LOGO";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Rádio Mix FM</h1>
            </div>
          </div>

          {/* Avatar e Controles */}
          <div className="flex items-center space-x-3">
            {/* Botão Upgrade */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-blue-500 hover:from-blue-600 hover:to-blue-800"
                >
                  <ArrowUp className="w-4 h-4 mr-1" />
                  Upgrade
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fazer upgrade do plano</p>
              </TooltipContent>
            </Tooltip>

            {/* Botão Notificações */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground relative"
                >
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Novidades</p>
              </TooltipContent>
            </Tooltip>

            {/* Toggle Tema */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDarkMode ? 'Tema claro' : 'Tema escuro'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Dropdown do Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/40x40/666666/FFFFFF?text=U" alt="User" />
                    <AvatarFallback className="bg-blue-500 text-white">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'Usuário'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                      {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </Badge>
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
                
                {/* Color Selection Section */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <span className="text-sm">Cores do tema</span>
                  </div>
                </DropdownMenuLabel>
                <div className="px-2 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setSelectedColor("blue")}
                      className={`w-6 h-6 rounded-full bg-blue-600 border-2 transition-all ${
                        selectedColor === "blue" ? "border-foreground scale-110" : "border-border hover:border-foreground/50"
                      }`}
                      title="Azul"
                    />
                    <button
                      onClick={() => setSelectedColor("green")}
                      className={`w-6 h-6 rounded-full bg-green-600 border-2 transition-all ${
                        selectedColor === "green" ? "border-foreground scale-110" : "border-border hover:border-foreground/50"
                      }`}
                      title="Verde"
                    />
                    <button
                      onClick={() => setSelectedColor("red")}
                      className={`w-6 h-6 rounded-full bg-red-600 border-2 transition-all ${
                        selectedColor === "red" ? "border-foreground scale-110" : "border-border hover:border-foreground/50"
                      }`}
                      title="Vermelho"
                    />
                    <button
                      onClick={() => setSelectedColor("purple")}
                      className={`w-6 h-6 rounded-full bg-purple-600 border-2 transition-all ${
                        selectedColor === "purple" ? "border-foreground scale-110" : "border-border hover:border-foreground/50"
                      }`}
                      title="Roxo"
                    />
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
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
      {showVehicleManager && (
        <VehicleManager 
          onPlayToggle={handleVehiclePlayToggle}
          isPlaying={isVehiclePlaying}
        />
      )}
    </TooltipProvider>
  );
};
