
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 border-t border-border">
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-6">
        
        {/* Informações da Música */}
        <div className="flex items-center space-x-3 min-w-0 w-1/4">
          <div className="w-12 h-12 bg-secondary rounded-md flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">Rock Clássico Mix</p>
            <p className="text-xs text-muted-foreground truncate">Tocando agora na Rádio Mix FM</p>
          </div>
        </div>

        {/* Controles Centrais */}
        <div className="flex flex-col items-center space-y-2 w-1/2 max-w-md">
          {/* Botões de Controle */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Barra de Progresso */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-muted-foreground">2:15</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">4:32</span>
          </div>
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
    </footer>
  );
};
