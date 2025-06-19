
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Music, MoreHorizontal, Copy, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [selectedPlaylists, setSelectedPlaylists] = useState<Record<string, string[]>>({
    padrao: [],
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDay, setActiveDay] = useState("padrao");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

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

  // Filter playlists by search term
  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handlePlaylistToggle = (playlistId: string, day: string) => {
    setSelectedPlaylists(prev => ({
      ...prev,
      [day]: prev[day].includes(playlistId)
        ? prev[day].filter(id => id !== playlistId)
        : [...prev[day], playlistId]
    }));
  };

  const replicateToDay = (playlistId: string, targetDay: string) => {
    setSelectedPlaylists(prev => ({
      ...prev,
      [targetDay]: prev[targetDay].includes(playlistId) 
        ? prev[targetDay] 
        : [...prev[targetDay], playlistId]
    }));
  };

  const removeFromDay = (playlistId: string, day: string) => {
    setSelectedPlaylists(prev => ({
      ...prev,
      [day]: prev[day].filter(id => id !== playlistId)
    }));
  };

  const removeFromAllDays = (playlistId: string) => {
    setSelectedPlaylists(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(day => {
        updated[day] = updated[day].filter(id => id !== playlistId);
      });
      return updated;
    });
  };

  const getPlaylistDays = (playlistId: string) => {
    return Object.entries(selectedPlaylists)
      .filter(([_, playlists]) => playlists.includes(playlistId))
      .map(([day, _]) => day);
  };

  const handleDropdownOpenChange = (playlistId: string, isOpen: boolean) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [playlistId]: isOpen
    }));
  };

  // Initialize selected playlists from API data
  useEffect(() => {
    if (playlists.length > 0) {
      const initialSelected = playlists
        .filter(playlist => playlist.selected)
        .map(playlist => playlist.id);
      setSelectedPlaylists(prev => ({
        ...prev,
        padrao: initialSelected
      }));
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
            Gerencie suas playlists por dia da semana ({selectedPlaylists[activeDay]?.length || 0} selecionadas em {daysOfWeek.find(d => d.id === activeDay)?.label})
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
                  {filteredPlaylists.map((playlist) => {
                    const isSelected = selectedPlaylists[day.id]?.includes(playlist.id) || false;
                    const playlistDays = getPlaylistDays(playlist.id);
                    
                    return (
                      <Card 
                        key={playlist.id} 
                        className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-md' 
                            : 'border-border/80 hover:border-primary/50 bg-card/60 hover:bg-card shadow-sm'
                        }`}
                        onClick={() => handlePlaylistToggle(playlist.id, day.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handlePlaylistToggle(playlist.id, day.id)}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-8 h-8 rounded bg-gradient-to-br flex items-center justify-center ${
                                    isSelected
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
                                      isSelected
                                        ? 'text-primary-foreground'
                                        : 'text-muted-foreground/80'
                                    }`} />
                                  </div>
                                  <h3 className={`font-medium truncate ${
                                    isSelected
                                      ? 'text-foreground'
                                      : 'text-foreground/80'
                                  }`}>
                                    {playlist.name}
                                  </h3>
                                </div>
                                
                                {/* Dropdown Menu */}
                                <DropdownMenu 
                                  open={openDropdowns[playlist.id] || false}
                                  onOpenChange={(isOpen) => handleDropdownOpenChange(playlist.id, isOpen)}
                                >
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-accent">
                                      <span className="sr-only">Abrir menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent 
                                    align="end" 
                                    className="w-56 bg-popover border z-50"
                                    onPointerDownOutside={(e) => {
                                      // Não fechar se o clique for dentro do próprio dropdown
                                      const target = e.target as Element;
                                      if (target.closest('[data-radix-popper-content-wrapper]')) {
                                        e.preventDefault();
                                      }
                                    }}
                                  >
                                    <DropdownMenuLabel>Replicar para:</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {daysOfWeek
                                      .filter(d => d.id !== day.id && d.id !== 'padrao')
                                      .map((targetDay) => (
                                        <DropdownMenuItem
                                          key={targetDay.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            replicateToDay(playlist.id, targetDay.id);
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          {targetDay.label}
                                          {selectedPlaylists[targetDay.id]?.includes(playlist.id) && (
                                            <span className="ml-auto text-xs text-primary">✓</span>
                                          )}
                                        </DropdownMenuItem>
                                      ))}
                                    {day.id === 'padrao' && (
                                      <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            daysOfWeek.filter(d => d.id !== 'padrao').forEach(targetDay => {
                                              replicateToDay(playlist.id, targetDay.id);
                                            });
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          Todos os dias
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    {playlistDays.length > 1 && (
                                      <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            removeFromAllDays(playlist.id);
                                            handleDropdownOpenChange(playlist.id, false);
                                          }}
                                          className="cursor-pointer text-destructive"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Remover de todos
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleDropdownOpenChange(playlist.id, false);
                                      }}
                                      className="cursor-pointer text-muted-foreground"
                                    >
                                      Fechar menu
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              <p className={`text-sm mb-2 line-clamp-2 ${
                                isSelected
                                  ? 'text-muted-foreground'
                                  : 'text-muted-foreground/70'
                              }`}>
                                {playlist.description}
                              </p>
                              
                              <div className={`text-xs flex justify-between items-center ${
                                isSelected
                                  ? 'text-muted-foreground'
                                  : 'text-muted-foreground/60'
                              }`}>
                                <span>{playlist.tracks} músicas</span>
                                <span>{playlist.duration}</span>
                              </div>
                              
                              {/* Indicador de dias ativos - mostra apenas se a playlist está em outros dias */}
                              {playlistDays.length > 0 && (
                                <div className="mt-2">
                                  <div className="flex flex-wrap gap-1">
                                    {playlistDays.map(dayId => {
                                      const dayLabel = daysOfWeek.find(d => d.id === dayId)?.label;
                                      return (
                                        <span 
                                          key={dayId}
                                          className={`text-xs px-2 py-1 rounded ${
                                            dayId === activeDay 
                                              ? 'bg-primary text-primary-foreground' 
                                              : 'bg-primary/20 text-primary'
                                          }`}
                                        >
                                          {dayLabel}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {filteredPlaylists.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchTerm 
                      ? `Nenhuma playlist encontrada para "${searchTerm}"`
                      : `Nenhuma playlist disponível`
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
