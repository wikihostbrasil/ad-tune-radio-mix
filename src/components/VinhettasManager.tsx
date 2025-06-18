
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown, Plus, Play, Pause, Music2 } from "lucide-react";

interface Vinheta {
  id: string;
  name: string;
  duration: string;
  active: boolean;
  frequency: number;
}

export const VinhettasManager = () => {
  const [vinhetas, setVinhetas] = useState<Vinheta[]>([
    {
      id: "1",
      name: "Vinheta Manhã Alegre",
      duration: "0:15",
      active: true,
      frequency: 3,
    },
    {
      id: "2",
      name: "ID Station Rock",
      duration: "0:08",
      active: false,
      frequency: 5,
    },
    {
      id: "3",
      name: "Promo Show da Tarde",
      duration: "0:12",
      active: true,
      frequency: 2,
    },
  ]);

  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleVinheta = (id: string) => {
    setVinhetas(prev => 
      prev.map(v => v.id === id ? { ...v, active: !v.active } : v)
    );
  };

  const updateFrequency = (id: string, change: number) => {
    setVinhetas(prev =>
      prev.map(v =>
        v.id === id
          ? { ...v, frequency: Math.max(1, Math.min(10, v.frequency + change)) }
          : v
      )
    );
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Simulate audio ending after 3 seconds
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Vinhetas</h2>
          <p className="text-muted-foreground">
            Configure suas vinhetas e frequência de reprodução
          </p>
        </div>
        <Button className="spotify-gradient hover:opacity-90 text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Nova Vinheta
        </Button>
      </div>

      <div className="grid gap-4">
        {vinhetas.map((vinheta) => (
          <Card
            key={vinheta.id}
            className={`
              border transition-all duration-300 hover:shadow-lg
              ${
                vinheta.active
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/40 bg-card/50"
              }
            `}
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg radio-gradient flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vinheta.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {vinheta.duration}
                      </Badge>
                      <Badge
                        variant={vinheta.active ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {vinheta.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlay(vinheta.id)}
                    className="hover:bg-accent/50"
                  >
                    {playingId === vinheta.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`switch-${vinheta.id}`} className="text-sm">
                      Ativar
                    </Label>
                    <Switch
                      id={`switch-${vinheta.id}`}
                      checked={vinheta.active}
                      onCheckedChange={() => toggleVinheta(vinheta.id)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium">
                    Tocar a cada:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(vinheta.id, -1)}
                      disabled={vinheta.frequency <= 1}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-medium">{vinheta.frequency}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(vinheta.id, 1)}
                      disabled={vinheta.frequency >= 10}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <Label className="text-sm text-muted-foreground">
                    músicas
                  </Label>
                </div>

                {playingId === vinheta.id && (
                  <div className="flex items-center space-x-2 text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-medium">Reproduzindo...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
