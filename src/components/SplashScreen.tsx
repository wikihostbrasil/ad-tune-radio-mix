
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
    { label: 'Carregando sistema...', duration: 800 },
    { label: 'Configurando rádio...', duration: 600 },
    { label: 'Sincronizando dados...', duration: 700 },
    { label: 'Finalizando...', duration: 500 }
  ];

  useEffect(() => {
    let currentProgress = 0;
    let stepIndex = 0;

    const updateProgress = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].label);
        
        const interval = setInterval(() => {
          currentProgress += 2;
          setProgress(currentProgress);
          
          if (currentProgress >= (stepIndex + 1) * (100 / steps.length)) {
            clearInterval(interval);
            stepIndex++;
            
            if (stepIndex >= steps.length) {
              setTimeout(() => {
                onComplete();
              }, 300);
            } else {
              setTimeout(updateProgress, 100);
            }
          }
        }, steps[stepIndex].duration / 50);
      }
    };

    updateProgress();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
      <div className="text-center space-y-8 px-6 max-w-md w-full">
        {/* Logo e Ícone */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center animate-pulse">
            <RadioIcon className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Rádio Mix FM</h1>
          <p className="text-muted-foreground">Preparando sua experiência...</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress 
            value={progress} 
            className="h-2 bg-muted"
          />
          <p className="text-sm text-muted-foreground animate-fade-in">
            {currentStep}
          </p>
          <div className="text-xs text-muted-foreground/70">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};
