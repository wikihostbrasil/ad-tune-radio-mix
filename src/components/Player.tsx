
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-24 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 border-t border-border">
      <div className="container mx-auto h-full px-4 lg:px-6">
        
        {/* Progress Bar - Full Width at Top */}
        <div className="w-full py-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>2:15</span>
            <span>4:32</span>
          </div>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between h-16">
          
          {/* Informações da Música */}
          <div className="flex items-center space-x-3 min-w-0 w-1/4">
            <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src="https://placehold.co/48x48/0066FF/FFFFFF?text=♪" 
                alt="Album Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">Rock Clássico Mix</p>
              <p className="text-xs text-muted-foreground truncate">Tocando agora na Rádio Mix FM</p>
            </div>
          </div>

          {/* Controles Centrais */}
          <div className="flex items-center space-x-4 w-1/2 justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Controle de Volume */}
          <div className="flex items-center space-x-2 w-1/4 justify-end">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
