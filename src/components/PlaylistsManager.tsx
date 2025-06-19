
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, Music } from "lucide-react";

const musicGenres = [
  { id: 1, name: "Pop Internacional", description: "Sucessos pop do mundo todo", songs: 120 },
  { id: 2, name: "Rock Clássico", description: "Os maiores clássicos do rock", songs: 85 },
  { id: 3, name: "MPB", description: "Música Popular Brasileira", songs: 95 },
  { id: 4, name: "Sertanejo", description: "Hits sertanejos atuais e clássicos", songs: 110 },
  { id: 5, name: "Eletrônica", description: "Dance e música eletrônica", songs: 75 },
  { id: 6, name: "Jazz", description: "Jazz clássico e contemporâneo", songs: 65 },
  { id: 7, name: "Reggae", description: "Reggae nacional e internacional", songs: 45 },
  { id: 8, name: "Hip Hop", description: "Rap e hip hop brasileiro e internacional", songs: 80 },
  { id: 9, name: "Forró", description: "Forró tradicional e moderno", songs: 70 },
  { id: 10, name: "Bossa Nova", description: "Clássicos da bossa nova", songs: 55 },
];

export const PlaylistsManager = () => {
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGenres = musicGenres.filter(genre =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    genre.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaylistToggle = (playlistId: number) => {
    setSelectedPlaylists(prev => 
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Music className="w-5 h-5" />
            Playlists Musicais
          </CardTitle>
          <p className="text-muted-foreground">
            Selecione os estilos musicais para sua programação ({selectedPlaylists.length} selecionados)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar estilos musicais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Lista de Playlists - 4 colunas no desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGenres.map((genre) => (
              <Card 
                key={genre.id} 
                className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                  selectedPlaylists.includes(genre.id) 
                    ? 'border-primary bg-primary/10 shadow-md' 
                    : 'border-border/60 hover:border-primary/50 bg-card/80 hover:bg-card'
                }`}
                onClick={() => handlePlaylistToggle(genre.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedPlaylists.includes(genre.id)}
                      onChange={() => handlePlaylistToggle(genre.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-8 h-8 rounded bg-gradient-to-br flex items-center justify-center ${
                          selectedPlaylists.includes(genre.id)
                            ? 'from-primary to-primary/80'
                            : 'from-muted-foreground/80 to-muted-foreground/60'
                        }`}>
                          <Music className={`w-4 h-4 ${
                            selectedPlaylists.includes(genre.id)
                              ? 'text-primary-foreground'
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <h3 className={`font-medium truncate ${
                          selectedPlaylists.includes(genre.id)
                            ? 'text-foreground'
                            : 'text-foreground/90'
                        }`}>
                          {genre.name}
                        </h3>
                      </div>
                      <p className={`text-sm mb-2 line-clamp-2 ${
                        selectedPlaylists.includes(genre.id)
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground/80'
                      }`}>
                        {genre.description}
                      </p>
                      <div className={`text-xs ${
                        selectedPlaylists.includes(genre.id)
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground/70'
                      }`}>
                        {genre.songs} músicas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGenres.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum estilo musical encontrado para "{searchTerm}"
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
