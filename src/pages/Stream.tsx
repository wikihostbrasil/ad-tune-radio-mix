
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioIcon, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const Stream = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);

  const currentTrack = {
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Background Logo (Blurred) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center blur-3xl">
          <RadioIcon className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4 shadow-2xl">
            <RadioIcon className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-center text-foreground">Rádio Mix FM</h1>
          <p className="text-center text-muted-foreground mt-2">
            Transmitindo ao vivo 24/7
          </p>
        </div>

        {/* Now Playing */}
        <Card className="w-full max-w-md border-border/40 mb-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {currentTrack.title}
            </h3>
            <p className="text-muted-foreground mb-1">{currentTrack.artist}</p>
            <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
          </CardContent>
        </Card>

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
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="icon"
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
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
              className="text-muted-foreground hover:text-foreground"
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
