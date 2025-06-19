
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Shield, Users, Car, MessageSquare, Play } from "lucide-react";
import { ConfigurationsModal } from "./ConfigurationsModal";
import { ProfileModal } from "./ProfileModal";
import { PasswordModal } from "./PasswordModal";
import { EmployeeManagementModal } from "./EmployeeManagementModal";
import { VehicleManager } from "./VehicleManager";

interface HeaderProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onStartTour?: () => void;
}

export const Header = ({ selectedColor, setSelectedColor, onStartTour }: HeaderProps) => {
  const [showConfigurations, setShowConfigurations] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  const colorOptions = [
    { name: "blue", color: "bg-blue-600", label: "Azul" },
    { name: "green", color: "bg-green-600", label: "Verde" },
    { name: "red", color: "bg-red-600", label: "Vermelho" },
    { name: "purple", color: "bg-purple-600", label: "Roxo" },
  ];

  return (
    <>
      <header 
        data-tour="header"
        className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-foreground">Painel Rádio Mix FM</h2>
            <Badge variant="secondary" className="text-xs">
              v2.0
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Botão Tour Virtual */}
            {onStartTour && (
              <Button
                variant="outline"
                size="sm"
                onClick={onStartTour}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Tour
              </Button>
            )}

            {/* Color Picker Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowColorDropdown(!showColorDropdown)}
                className="p-2"
              >
                <div className={`w-4 h-4 rounded-full ${colorOptions.find(c => c.name === selectedColor)?.color}`} />
              </Button>
              
              {showColorDropdown && (
                <div className="absolute right-0 mt-2 p-2 bg-background border border-border rounded-lg shadow-lg z-40">
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => {
                          setSelectedColor(option.name);
                          setShowColorDropdown(false);
                        }}
                        className={`w-6 h-6 rounded-full ${option.color} border-2 transition-all ${
                          selectedColor === option.name 
                            ? "border-foreground scale-110" 
                            : "border-border hover:border-foreground/50"
                        }`}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Perfil
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPassword(true)}
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Senha
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmployees(true)}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Funcionários
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVehicles(true)}
              className="flex items-center gap-2"
            >
              <Car className="w-4 h-4" />
              Veículos
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfigurations(true)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Config
            </Button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ConfigurationsModal 
        isOpen={showConfigurations} 
        onClose={() => setShowConfigurations(false)} 
      />
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
      <PasswordModal 
        isOpen={showPassword} 
        onClose={() => setShowPassword(false)} 
      />
      <EmployeeManagementModal 
        isOpen={showEmployees} 
        onClose={() => setShowEmployees(false)} 
      />
      <VehicleManager 
        isOpen={showVehicles} 
        onClose={() => setShowVehicles(false)} 
      />
    </>
  );
};
