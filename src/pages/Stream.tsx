
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioIcon, Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
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
            src="https://placehold.co/200x200/0066FF/FFFFFF?text=LOGO" 
            alt="Background Logo" 
            className="w-48 h-48 object-contain opacity-50"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 shadow-2xl overflow-hidden">
            <img 
              src={logoUrl || "https://placehold.co/160x160/0066FF/FFFFFF?text=LOGO"} 
              alt="Logo" 
              className="w-32 h-32 object-contain rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-foreground mb-2">Rádio Mix FM</h1>
          <p className="text-center text-muted-foreground">
            Transmitindo ao vivo 24/7
          </p>
        </div>
      </div>

      {/* Footer Player - Spotify Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border">
        {/* Progress Bar - Full Width at Top */}
        <div className="w-full px-4 py-1">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full h-1"
          />
        </div>

        <div className="container mx-auto h-20 px-4 lg:px-6">
          <div className="flex items-center justify-between h-full">
            
            {/* Track Info */}
            <div className="flex items-center space-x-3 min-w-0 w-1/4">
              <div className="w-14 h-14 bg-secondary rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src="https://placehold.co/56x56/0066FF/FFFFFF?text=♪" 
                  alt="Album Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{currentTrack.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Central Controls */}
            <div className="flex flex-col items-center w-1/2">
              <div className="flex items-center space-x-4 mb-2">
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
                  className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
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
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{currentTrack.currentTime}</span>
                <span>•</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 w-1/4 justify-end">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground w-8">{volume[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
