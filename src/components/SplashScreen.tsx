
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { RadioIcon } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const steps = [
    { label: 'Carregando sistema...', duration: 1200 },
    { label: 'Configurando rádio...', duration: 900 },
    { label: 'Sincronizando dados...', duration: 1000 },
    { label: 'Finalizando...', duration: 800 }
  ];

  useEffect(() => {
    let currentProgress = 0;
    let stepIndex = 0;

    const updateProgress = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].label);
        
        const interval = setInterval(() => {
          currentProgress += 1.5;
          setProgress(currentProgress);
          
          if (currentProgress >= (stepIndex + 1) * (100 / steps.length)) {
            clearInterval(interval);
            stepIndex++;
            
            if (stepIndex >= steps.length) {
              setTimeout(() => {
                onComplete();
              }, 500);
            } else {
              setTimeout(updateProgress, 200);
            }
          }
        }, steps[stepIndex].duration / 65);
      }
    };

    updateProgress();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
      <div className="text-center space-y-8 px-6 max-w-md w-full">
        {/* Logo e Ícone */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center animate-pulse shadow-2xl">
            <RadioIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Rádio Mix FM</h1>
          <p className="text-muted-foreground text-lg">Preparando sua experiência musical...</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <Progress 
            value={progress} 
            className="h-3 bg-muted rounded-full"
          />
          <p className="text-base text-muted-foreground animate-fade-in font-medium">
            {currentStep}
          </p>
          <div className="text-sm text-blue-500 font-semibold">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};
