
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Plus, Volume2, Trash2, Ban, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VirtualAd {
  id: string;
  title: string;
  text: string;
  voice: string;
  tone: string;
  speed: string;
  category: string;
  status: "active" | "blocked";
  createdAt: string;
}

export const VirtualVoiceManager = () => {
  const [virtualAds, setVirtualAds] = useState<VirtualAd[]>([
    {
      id: "1",
      title: "Promoção Black Friday",
      text: "Não perca a mega promoção Black Friday! Descontos de até 70% em toda a loja.",
      voice: "clara-profissional",
      tone: "energetico",
      speed: "normal",
      category: "promocional",
      status: "active",
      createdAt: "2024-12-01",
    },
    {
      id: "2",
      title: "Vinheta Institucional",
      text: "Você está ouvindo Rádio Mix FM, sempre com a melhor música.",
      voice: "marcos-locucao",
      tone: "institucional",
      speed: "normal",
      category: "vinhetas",
      status: "blocked",
      createdAt: "2024-11-28",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    voice: "",
    tone: "",
    speed: "normal",
    category: "",
  });

  const voices = [
    { id: "clara-profissional", name: "Clara Profissional", description: "Voz feminina, clara e profissional" },
    { id: "marcos-locucao", name: "Marcos Locução", description: "Voz masculina, ideal para locuções" },
    { id: "ana-comercial", name: "Ana Comercial", description: "Voz feminina, dinâmica para comerciais" },
    { id: "pedro-institucional", name: "Pedro Institucional", description: "Voz masculina, séria e confiável" },
  ];

  const tones = [
    { id: "energetico", name: "Energético" },
    { id: "institucional", name: "Institucional" },
    { id: "comercial", name: "Comercial" },
    { id: "amigavel", name: "Amigável" },
    { id: "serio", name: "Sério" },
  ];

  const speeds = [
    { id: "lento", name: "Lento" },
    { id: "normal", name: "Normal" },
    { id: "rapido", name: "Rápido" },
  ];

  const categories = [
    { id: "vinhetas", name: "Vinhetas" },
    { id: "institucional", name: "Institucionais" },
    { id: "promocional", name: "Promocionais" },
    { id: "avisos", name: "Avisos Exclusivos" },
  ];

  const handleCreate = () => {
    const newAd: VirtualAd = {
      id: Date.now().toString(),
      title: formData.title,
      text: formData.text,
      voice: formData.voice,
      tone: formData.tone,
      speed: formData.speed,
      category: formData.category,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVirtualAds(prev => [...prev, newAd]);
    setFormData({
      title: "",
      text: "",
      voice: "",
      tone: "",
      speed: "normal",
      category: "",
    });
    setIsDialogOpen(false);
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 5000);
    }
  };

  const toggleStatus = (id: string) => {
    setVirtualAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, status: ad.status === "active" ? "blocked" : "active" } : ad
    ));
  };

  const deleteAd = (id: string) => {
    setVirtualAds(prev => prev.filter(ad => ad.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Locução Virtual (IA)</h2>
          <p className="text-muted-foreground">
            Crie anúncios com vozes geradas por inteligência artificial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Criar um anúncio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-background">
            <DialogHeader>
              <DialogTitle>Criar Anúncio com IA</DialogTitle>
              <DialogDescription>
                Configure seu anúncio com locução gerada por inteligência artificial
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do anúncio</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Digite o título do anúncio"
                />
              </div>

              <div>
                <Label htmlFor="text">Texto</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Digite o texto que será convertido em áudio..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voice">Selecionar voz</Label>
                  <Select value={formData.voice} onValueChange={(value) => setFormData(prev => ({ ...prev, voice: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha uma voz" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div>
                            <div className="font-medium">{voice.name}</div>
                            <div className="text-xs text-muted-foreground">{voice.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone">Tipo de entonação</Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map(tone => (
                        <SelectItem key={tone.id} value={tone.id}>
                          {tone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="speed">Velocidade</Label>
                  <Select value={formData.speed} onValueChange={(value) => setFormData(prev => ({ ...prev, speed: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speeds.map(speed => (
                        <SelectItem key={speed.id} value={speed.id}>
                          {speed.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Incluir em</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Informações sobre locução IA:</strong> O áudio será gerado com qualidade profissional, 
                  utilizando tecnologia de síntese de voz avançada. O processamento pode levar alguns minutos.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>
                Gerar Anúncio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Anúncios Gerados */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Anúncios Gerados por IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {virtualAds.map((ad) => (
              <Card key={ad.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{ad.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {voices.find(v => v.id === ad.voice)?.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tones.find(t => t.id === ad.tone)?.name}
                          </Badge>
                          <Badge 
                            variant={ad.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {ad.status === "active" ? "Ativo" : "Bloqueado"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {ad.text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePlay(ad.id)}
                        className="hover:bg-accent/50"
                      >
                        {playingId === ad.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStatus(ad.id)}
                        className={ad.status === "active" ? "text-yellow-500 hover:text-yellow-600" : "text-green-500 hover:text-green-600"}
                      >
                        {ad.status === "active" ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAd(ad.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {playingId === ad.id && (
                    <div className="mt-3 flex items-center space-x-2 text-blue-500">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-sm font-medium">Reproduzindo áudio gerado por IA...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {virtualAds.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum anúncio criado ainda. Clique em "Criar um anúncio" para começar.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
