
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, Music } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Playlist {
  id: string;
  name: string;
  description: string;
  category: string;
  tracks: number;
  duration: string;
  image: string;
  selected: boolean;
  dayOfWeek: string;
}

const daysOfWeek = [
  { id: "padrao", label: "Padrão" },
  { id: "segunda", label: "Segunda" },
  { id: "terca", label: "Terça" },
  { id: "quarta", label: "Quarta" },
  { id: "quinta", label: "Quinta" },
  { id: "sexta", label: "Sexta" },
  { id: "sabado", label: "Sábado" },
];

export const PlaylistsManager = () => {
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDay, setActiveDay] = useState("padrao");

  const { data: playlists = [], isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await fetch('/api/playlists.json');
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      return response.json() as Promise<Playlist[]>;
    },
  });

  // Filter playlists by search term and day
  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = activeDay === "padrao" || playlist.dayOfWeek.toLowerCase() === activeDay;
    return matchesSearch && matchesDay;
  });

  const handlePlaylistToggle = (playlistId: string) => {
    setSelectedPlaylists(prev => 
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  // Initialize selected playlists from API data
  useEffect(() => {
    if (playlists.length > 0) {
      const initialSelected = playlists
        .filter(playlist => playlist.selected)
        .map(playlist => playlist.id);
      setSelectedPlaylists(initialSelected);
    }
  }, [playlists]);

  if (isLoading) {
    return (
      <Card className="border-border/60">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Carregando playlists...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Music className="w-5 h-5" />
            Playlists Musicais
          </CardTitle>
          <p className="text-muted-foreground">
            Gerencie suas playlists por dia da semana ({selectedPlaylists.length} selecionadas)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar playlists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Tabs por dia da semana */}
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="grid w-full grid-cols-7">
              {daysOfWeek.map((day) => (
                <TabsTrigger key={day.id} value={day.id} className="text-xs">
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {daysOfWeek.map((day) => (
              <TabsContent key={day.id} value={day.id} className="mt-4">
                {/* Lista de Playlists - 4 colunas no desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredPlaylists.map((playlist) => (
                    <Card 
                      key={playlist.id} 
                      className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                        selectedPlaylists.includes(playlist.id) 
                          ? 'border-primary bg-primary/10 shadow-md' 
                          : 'border-border hover:border-primary/50 bg-card/60 hover:bg-card shadow-sm'
                      }`}
                      onClick={() => handlePlaylistToggle(playlist.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedPlaylists.includes(playlist.id)}
                            onChange={() => handlePlaylistToggle(playlist.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-8 h-8 rounded bg-gradient-to-br flex items-center justify-center ${
                                selectedPlaylists.includes(playlist.id)
                                  ? 'from-primary to-primary/80'
                                  : 'from-muted-foreground/60 to-muted-foreground/40'
                              }`}>
                                <img 
                                  src={playlist.image} 
                                  alt={playlist.name}
                                  className="w-full h-full rounded object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <Music className={`w-4 h-4 hidden ${
                                  selectedPlaylists.includes(playlist.id)
                                    ? 'text-primary-foreground'
                                    : 'text-muted-foreground/80'
                                }`} />
                              </div>
                              <h3 className={`font-medium truncate ${
                                selectedPlaylists.includes(playlist.id)
                                  ? 'text-foreground'
                                  : 'text-foreground/80'
                              }`}>
                                {playlist.name}
                              </h3>
                            </div>
                            <p className={`text-sm mb-2 line-clamp-2 ${
                              selectedPlaylists.includes(playlist.id)
                                ? 'text-muted-foreground'
                                : 'text-muted-foreground/70'
                            }`}>
                              {playlist.description}
                            </p>
                            <div className={`text-xs flex justify-between ${
                              selectedPlaylists.includes(playlist.id)
                                ? 'text-muted-foreground'
                                : 'text-muted-foreground/60'
                            }`}>
                              <span>{playlist.tracks} músicas</span>
                              <span>{playlist.duration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPlaylists.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm 
                      ? `Nenhuma playlist encontrada para "${searchTerm}" em ${day.label}`
                      : `Nenhuma playlist configurada para ${day.label}`
                    }
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
