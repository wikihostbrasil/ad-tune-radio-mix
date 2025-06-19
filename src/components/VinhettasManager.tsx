
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown, Plus, Play, Pause, Music2, Lock, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Announcement {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: "vinheta" | "institucional" | "promocional";
  playEvery: number;
  active: boolean;
  fileCount?: number;
  startDate?: string;
  endDate?: string;
  days?: string[];
}

export const VinhettasManager = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Load announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/anuncios.json');
        const data: Announcement[] = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Categories for left column
  const categories = [
    {
      id: "vinheta",
      name: "Vinhetas",
      description: "Vinhetas de identificação",
      count: announcements.filter(a => a.type === "vinheta").length,
      frequency: 3
    },
    {
      id: "institucional",
      name: "Institucionais",
      description: "Campanhas institucionais",
      count: announcements.filter(a => a.type === "institucional").length,
      frequency: 15
    },
    {
      id: "promocional",
      name: "Promocionais",
      description: "Promoções e eventos",
      count: announcements.filter(a => a.type === "promocional").length,
      frequency: 12
    }
  ];

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev => 
      prev.map(a => a.id === id ? { ...a, active: !a.active } : a)
    );
  };

  const updateFrequency = (id: string, change: number) => {
    setAnnouncements(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, playEvery: Math.max(1, Math.min(50, a.playEvery + change)) }
          : a
      )
    );
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const updateCategoryFrequency = (categoryId: string, change: number) => {
    // Update frequency for category - this would update all items in the category
    console.log(`Updating ${categoryId} frequency by ${change}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Anúncios</h2>
          <p className="text-muted-foreground">
            Configure suas vinhetas, institucionais e promocionais
          </p>
        </div>
        <Button className="spotify-gradient hover:opacity-90 text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Novo Anúncio
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Categorias de Anúncios</h3>
          
          {categories.map((category) => (
            <Card
              key={category.id}
              className="border transition-all duration-300 hover:shadow-lg border-border/40 bg-card/50"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg radio-gradient flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {category.count} anúncios
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Tocar a cada:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCategoryFrequency(category.id, -1)}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-medium">{category.frequency}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCategoryFrequency(category.id, 1)}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <Label className="text-sm text-muted-foreground">
                    músicas
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column - Library */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Biblioteca de Anúncios</h3>
          
          <Accordion type="multiple" className="space-y-4">
            {categories.map((category) => {
              const categoryAnnouncements = announcements.filter(a => a.type === category.id);
              
              return (
                <AccordionItem key={category.id} value={category.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <Music2 className="w-4 h-4" />
                      <span>{category.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {categoryAnnouncements.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {categoryAnnouncements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium">{announcement.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {announcement.duration}
                              </Badge>
                              <Badge
                                variant={announcement.active ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {announcement.active ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Status: {announcement.active ? "Ativo" : "Inativo"}</span>
                              {announcement.startDate && (
                                <span>Início: {announcement.startDate}</span>
                              )}
                              {announcement.endDate && (
                                <span>Término: {announcement.endDate}</span>
                              )}
                              {announcement.days && (
                                <span>Dias: {announcement.days.join(", ")}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePlay(announcement.id)}
                              className="hover:bg-accent/50"
                            >
                              {playingId === announcement.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAnnouncement(announcement.id)}
                              className="hover:bg-accent/50"
                            >
                              <Lock className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-destructive/20 text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
