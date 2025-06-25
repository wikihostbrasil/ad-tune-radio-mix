
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Play, Pause, Filter } from "lucide-react";
import { Header } from "@/components/Header";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AudioFile {
  id: string;
  name: string;
  category: 'vinheta' | 'anuncio' | 'musica' | 'efeito';
  duration: string;
  size: string;
  url: string;
  preview?: string;
}

const DownloadsPage = () => {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [files, setFiles] = useState<AudioFile[]>([]);

  // Mock data - em produção viria da API
  useEffect(() => {
    const mockFiles: AudioFile[] = [
      {
        id: "1",
        name: "Vinheta Abertura Show",
        category: "vinheta",
        duration: "0:15",
        size: "2.3 MB",
        url: "/downloads/vinheta-abertura.mp3",
        preview: "/previews/vinheta-abertura-preview.mp3"
      },
      {
        id: "2", 
        name: "Anúncio Promoção Black Friday",
        category: "anuncio",
        duration: "0:30",
        size: "4.1 MB",
        url: "/downloads/anuncio-black-friday.mp3"
      },
      {
        id: "3",
        name: "Efeito Sonoro Transição",
        category: "efeito",
        duration: "0:05",
        size: "800 KB",
        url: "/downloads/efeito-transicao.mp3"
      },
      {
        id: "4",
        name: "Música de Fundo Institucional",
        category: "musica",
        duration: "2:30",
        size: "8.5 MB",
        url: "/downloads/musica-institucional.mp3",
        preview: "/previews/musica-institucional-preview.mp3"
      }
    ];
    setFiles(mockFiles);
  }, []);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      vinheta: "bg-blue-100 text-blue-800",
      anuncio: "bg-green-100 text-green-800", 
      musica: "bg-purple-100 text-purple-800",
      efeito: "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      vinheta: "Vinheta",
      anuncio: "Anúncio",
      musica: "Música",
      efeito: "Efeito"
    };
    return labels[category] || category;
  };

  const handlePlayPreview = (fileId: string) => {
    if (playingFile === fileId) {
      setPlayingFile(null);
    } else {
      setPlayingFile(fileId);
      // Em produção, aqui tocaria o preview do áudio
      setTimeout(() => setPlayingFile(null), 3000); // Para demo
    }
  };

  const handleDownload = (file: AudioFile) => {
    // Em produção, faria o download real do arquivo
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header da página */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Downloads</h1>
            <p className="text-muted-foreground">
              Baixe vinhetas, anúncios, músicas e efeitos sonoros para sua rádio
            </p>
          </div>

          {/* Controles de filtro */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar arquivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="vinheta">Vinhetas</SelectItem>
                      <SelectItem value="anuncio">Anúncios</SelectItem>
                      <SelectItem value="musica">Músicas</SelectItem>
                      <SelectItem value="efeito">Efeitos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de arquivos */}
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{file.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge className={getCategoryColor(file.category)}>
                            {getCategoryLabel(file.category)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {file.duration}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {file.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.preview && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlayPreview(file.id)}
                        >
                          {playingFile === file.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleDownload(file)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Nenhum arquivo encontrado com os filtros selecionados.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;
