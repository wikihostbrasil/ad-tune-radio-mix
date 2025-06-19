
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronUp, ChevronDown, Plus, Play, Pause, Music2, Lock, LockOpen, Trash2, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Announcement {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: "vinheta" | "institucional" | "promocional" | "hora" | "dicas_gerais" | "dicas_cozinha" | "dicas_saude" | "dicas_beleza" | "dicas_moda" | "dicas_tecnologia";
  playEvery: number;
  active: boolean;
  fileCount?: number;
  startDate?: string;
  endDate?: string;
  days?: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  frequency: number;
  active: boolean;
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
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "vinheta",
      name: "Vinhetas",
      description: "Vinhetas de identificação da rádio",
      count: 0,
      frequency: 3,
      active: true
    },
    {
      id: "institucional",
      name: "Institucionais",
      description: "Campanhas institucionais e educativas",
      count: 0,
      frequency: 15,
      active: true
    },
    {
      id: "promocional",
      name: "Promocionais",
      description: "Promoções e eventos especiais",
      count: 0,
      frequency: 12,
      active: false
    },
    {
      id: "hora",
      name: "Hora Certa",
      description: "Anúncio da hora exata",
      count: 0,
      frequency: 60,
      active: true
    },
    {
      id: "dicas_gerais",
      name: "Dicas Gerais",
      description: "Dicas e conselhos variados",
      count: 0,
      frequency: 20,
      active: true
    },
    {
      id: "dicas_cozinha",
      name: "Dicas de Cozinha",
      description: "Receitas e dicas culinárias",
      count: 0,
      frequency: 25,
      active: false
    },
    {
      id: "dicas_saude",
      name: "Dicas de Saúde",
      description: "Orientações sobre saúde e bem-estar",
      count: 0,
      frequency: 30,
      active: true
    },
    {
      id: "dicas_beleza",
      name: "Dicas de Beleza",
      description: "Cuidados pessoais e beleza",
      count: 0,
      frequency: 35,
      active: false
    },
    {
      id: "dicas_moda",
      name: "Dicas de Moda",
      description: "Tendências e estilo",
      count: 0,
      frequency: 40,
      active: false
    },
    {
      id: "dicas_tecnologia",
      name: "Dicas de Tecnologia",
      description: "Novidades e tutoriais tecnológicos",
      count: 0,
      frequency: 30,
      active: true
    }
  ]);

  // Update category counts
  useEffect(() => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        count: announcements.filter(a => a.type === cat.id).length
      }))
    );
  }, [announcements]);

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
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, frequency: Math.max(1, Math.min(50, cat.frequency + change)) }
          : cat
      )
    );
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  const formatDays = (days?: string[]) => {
    if (!days || days.length === 0) return null;
    return days.map(day => (
      <Badge key={day} variant="outline" className="text-xs px-1 py-0">
        {day}
      </Badge>
    ));
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gerenciar Anúncios</h2>
            <p className="text-muted-foreground">
              Configure suas vinhetas, institucionais e promocionais
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="spotify-gradient hover:opacity-90 text-black font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Novo Anúncio
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar novo anúncio</p>
            </TooltipContent>
          </Tooltip>
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
                        {category.id === "hora" ? (
                          <Clock className="w-5 h-5 text-white" />
                        ) : (
                          <Music2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {category.count} anúncios
                        </Badge>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          checked={category.active}
                          onCheckedChange={() => toggleCategoryStatus(category.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{category.active ? 'Categoria ativa' : 'Categoria inativa'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Tocar a cada:
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCategoryFrequency(category.id, -1)}
                            className="w-8 h-8 p-0"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Diminuir frequência</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                        <span className="text-sm font-medium">{category.frequency}</span>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCategoryFrequency(category.id, 1)}
                            className="w-8 h-8 p-0"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aumentar frequência</p>
                        </TooltipContent>
                      </Tooltip>
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
                        {category.id === "hora" ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <Music2 className="w-4 h-4" />
                        )}
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
                              </div>
                              
                              <div className="space-y-1">
                                <div>
                                  <Badge
                                    variant={announcement.active ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {announcement.active ? "Ativo" : "Inativo"}
                                  </Badge>
                                </div>
                                
                                {(announcement.startDate || announcement.endDate) && (
                                  <div className="text-sm text-muted-foreground">
                                    {announcement.startDate && `Início: ${announcement.startDate}`}
                                    {announcement.startDate && announcement.endDate && ' - '}
                                    {announcement.endDate && `Término: ${announcement.endDate}`}
                                  </div>
                                )}
                                
                                {announcement.days && announcement.days.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    {formatDays(announcement.days)}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
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
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{playingId === announcement.id ? 'Pausar' : 'Reproduzir'}</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleAnnouncement(announcement.id)}
                                    className="hover:bg-accent/50"
                                  >
                                    {announcement.active ? (
                                      <LockOpen className="w-4 h-4" />
                                    ) : (
                                      <Lock className="w-4 h-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{announcement.active ? 'Bloquear' : 'Desbloquear'}</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-destructive/20 text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remover anúncio</p>
                                </TooltipContent>
                              </Tooltip>
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
    </TooltipProvider>
  );
};
