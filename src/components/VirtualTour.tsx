
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    id: "header",
    title: "Cabeçalho da Aplicação",
    description: "Aqui você pode alterar as cores do tema clicando no botão de configurações.",
    target: "[data-tour='header']",
    position: "bottom"
  },
  {
    id: "logo",
    title: "Logo da Rádio",
    description: "Esta é a área do logo e informações da sua rádio.",
    target: "[data-tour='logo']",
    position: "bottom"
  },
  {
    id: "tabs",
    title: "Navegação Principal",
    description: "Use essas abas para navegar entre as diferentes seções: Playlists, Anúncios, Avisos, etc.",
    target: "[data-tour='tabs']",
    position: "bottom"
  },
  {
    id: "player",
    title: "Player de Música",
    description: "Controle a reprodução das suas músicas e veja o que está tocando agora.",
    target: "[data-tour='player']",
    position: "top"
  },
  {
    id: "suggestions",
    title: "Sugestões",
    description: "Clique aqui para enviar sugestões ou feedback sobre a aplicação.",
    target: "[data-tour='suggestions']",
    position: "left"
  }
];

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualTour = ({ isOpen, onClose }: VirtualTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target) as HTMLElement;
    
    if (element) {
      setTargetElement(element);
      
      // Scroll para o elemento
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "center",
        inline: "center" 
      });
      
      // Calcular posição do tooltip
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        let top = 0;
        let left = 0;
        
        switch (step.position) {
          case "top":
            top = rect.top - 120;
            left = rect.left + rect.width / 2 - 150;
            break;
          case "bottom":
            top = rect.bottom + 20;
            left = rect.left + rect.width / 2 - 150;
            break;
          case "left":
            top = rect.top + rect.height / 2 - 60;
            left = rect.left - 320;
            break;
          case "right":
            top = rect.top + rect.height / 2 - 60;
            left = rect.right + 20;
            break;
        }
        
        setTooltipPosition({ top, left });
      }, 100);
    }
  }, [currentStep, isOpen]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black/70 z-50 pointer-events-auto">
        {/* Highlight do elemento atual */}
        {targetElement && (
          <div
            className="absolute border-4 border-blue-400 rounded-lg shadow-lg pointer-events-none animate-pulse"
            style={{
              top: targetElement.getBoundingClientRect().top - 4,
              left: targetElement.getBoundingClientRect().left - 4,
              width: targetElement.getBoundingClientRect().width + 8,
              height: targetElement.getBoundingClientRect().height + 8,
            }}
          />
        )}
        
        {/* Tooltip */}
        <Card 
          className="absolute w-80 z-60 shadow-2xl"
          style={{
            top: tooltipPosition.top,
            left: Math.max(20, Math.min(window.innerWidth - 340, tooltipPosition.left))
          }}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{currentTourStep.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Passo {currentStep + 1} de {tourSteps.length}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={skipTour}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm mb-6 leading-relaxed">
              {currentTourStep.description}
            </p>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              
              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                size="sm"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                {currentStep === tourSteps.length - 1 ? "Finalizar" : "Próximo"}
                {currentStep < tourSteps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
