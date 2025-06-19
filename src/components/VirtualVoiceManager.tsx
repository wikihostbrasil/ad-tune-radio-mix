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
  const [previewVoiceId, setPreviewVoiceId] = useState<string | null>(null);
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

  const toggleVoicePreview = (voiceId: string) => {
    if (previewVoiceId === voiceId) {
      setPreviewVoiceId(null);
    } else {
      setPreviewVoiceId(voiceId);
      setTimeout(() => setPreviewVoiceId(null), 3000);
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
          <DialogContent className="max-w-2xl bg-background border-2 border-border shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">Criar Anúncio com IA</DialogTitle>
              <DialogDescription className="text-muted-foreground">
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
                  <Select 
                    value={formData.voice} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, voice: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha uma voz" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{voice.name}</div>
                              <div className="text-xs text-muted-foreground">{voice.description}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVoicePreview(voice.id);
                              }}
                              className="ml-2"
                            >
                              {previewVoiceId === voice.id ? (
                                <Pause className="w-3 h-3" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {formData.voice && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700 dark:text-blue-300">
                          Preview: {voices.find(v => v.id === formData.voice)?.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleVoicePreview(formData.voice)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {previewVoiceId === formData.voice ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {previewVoiceId === formData.voice && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            Reproduzindo preview da voz...
                          </span>
                        </div>
                      )}
                    </div>
                  )}
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

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Informações sobre locução IA:</strong> O áudio será gerado com qualidade profissional, 
                  utilizando tecnologia de síntese de voz avançada. O processamento pode levar alguns minutos.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-2">
                Cancelar
              </Button>
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Anúncio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Anúncios Gerados */}
      <Card className="border-2 border-border/60 bg-card shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b border-border/40">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Volume2 className="w-5 h-5 text-blue-600" />
            Anúncios Gerados por IA
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {virtualAds.map((ad) => (
              <Card key={ad.id} className="border-2 border-border/50 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                        <Volume2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{ad.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs font-medium border-2 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                            {voices.find(v => v.id === ad.voice)?.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-medium border-2 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
                            {tones.find(t => t.id === ad.tone)?.name}
                          </Badge>
                          <Badge 
                            variant={ad.status === "active" ? "default" : "secondary"}
                            className={`text-xs font-medium border-2 ${
                              ad.status === "active" 
                                ? "bg-green-500 text-white border-green-600 shadow-sm" 
                                : "bg-gray-400 text-white border-gray-500"
                            }`}
                          >
                            {ad.status === "active" ? "Ativo" : "Bloqueado"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 font-medium">
                          {ad.text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePlay(ad.id)}
                        className="hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-transparent hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        {playingId === ad.id ? (
                          <Pause className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStatus(ad.id)}
                        className={`border border-transparent hover:border-current ${
                          ad.status === "active" 
                            ? "text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 hover:border-yellow-400" 
                            : "text-green-600 hover:bg-green-100 dark:hover:bg-green-900/50 hover:border-green-400"
                        }`}
                      >
                        {ad.status === "active" ? <Ban className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAd(ad.id)}
                        className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 border border-transparent hover:border-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {playingId === ad.id && (
                    <div className="mt-4 flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-sm"></div>
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Reproduzindo áudio gerado por IA...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {virtualAds.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Volume2 className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">Nenhum anúncio criado ainda.</p>
                <p className="text-sm mt-1">Clique em "Criar um anúncio" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
