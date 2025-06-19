
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Radio, CreditCard, User, Settings } from "lucide-react";

interface ConfigurationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigurationsModal = ({ isOpen, onClose }: ConfigurationsModalProps) => {
  const [activeSection, setActiveSection] = useState("radio");

  const sections = [
    { id: "radio", label: "Minha Rádio", icon: Radio },
    { id: "plans", label: "Planos e Faturas", icon: CreditCard },
    { id: "account", label: "Conta", icon: User },
    { id: "integrations", label: "Integrações", icon: Settings },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-background">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Gerencie suas configurações e preferências
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-6 mt-4">
          {/* Sidebar */}
          <div className="w-1/3 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    activeSection === section.id && "bg-accent"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 bg-accent/20 rounded-lg">
            {activeSection === "radio" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Configurações da Rádio</h3>
                <p className="text-muted-foreground">Configurações específicas da sua rádio...</p>
              </div>
            )}
            {activeSection === "plans" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Planos e Faturas</h3>
                <p className="text-muted-foreground">Gerencie seu plano e histórico de faturas...</p>
              </div>
            )}
            {activeSection === "account" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados da Conta</h3>
                <p className="text-muted-foreground">Informações pessoais e configurações de segurança...</p>
              </div>
            )}
            {activeSection === "integrations" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Integrações</h3>
                <p className="text-muted-foreground">Conecte com serviços externos...</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
