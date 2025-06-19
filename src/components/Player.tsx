
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = {
    title: "Rock Clássico Mix",
    artist: "Tocando agora na Rádio Mix FM",
    duration: "4:32",
    currentTime: "2:15",
    album: "Mix FM"
  };

  // Simulate progress
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
    <footer className="fixed bottom-0 left-0 right-0 z-50 text-white border-t border-gray-700" style={{ backgroundColor: '#282E32' }}>
      <div className="flex items-center h-20 px-4">
        
        {/* Left - Track Info */}
        <div className="flex items-center space-x-3 min-w-0 w-1/4">
          <div className="w-14 h-14 bg-gray-700 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src="https://placehold.co/56x56/333/FFF?text=♪" 
              alt="Album Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={`text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 ${isLiked ? 'text-green-500' : ''}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Center - Player Controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-black transition-all duration-200 hover:scale-105"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar with Time */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">{currentTrack.currentTime}</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1 h-1"
            />
            <span className="text-xs text-gray-400 w-10">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Right - Volume Control */}
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </footer>
  );
};
