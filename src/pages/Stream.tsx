
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioIcon, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useLogo } from "@/hooks/useLogo";

const Stream = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([45]);
  const { logoUrl } = useLogo();

  const currentTrack = {
    title: "Rock Clássico Mix",
    artist: "Tocando agora na Rádio Mix FM",
    duration: "4:32",
    currentTime: "2:15"
  };

  // Simulação do progresso da música
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev[0] + 1;
          return newProgress >= 100 ? [0] : [newProgress];
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Background Logo (Blurred) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center blur-3xl">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="w-48 h-48 object-contain opacity-50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <RadioIcon className="w-48 h-48 text-white hidden" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 shadow-2xl overflow-hidden">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="w-32 h-32 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <RadioIcon className="w-20 h-20 text-white hidden" />
          </div>
          <h1 className="text-4xl font-bold text-center text-foreground mb-2">Rádio Mix FM</h1>
          <p className="text-center text-muted-foreground">
            Transmitindo ao vivo 24/7
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{currentTrack.currentTime}</span>
            <span>{currentTrack.duration}</span>
          </div>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Volume Control */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center space-x-4">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-8">{volume[0]}</span>
          </div>
        </div>
      </div>

      {/* Footer Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="icon"
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-200 hover:scale-105 animate-pulse"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center mt-2">
            <p className="text-sm font-medium text-foreground">
              {currentTrack.title} - {currentTrack.artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
