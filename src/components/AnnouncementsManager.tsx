
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RadioIcon, Clock, Volume2 } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: "comercial" | "institucional" | "promocional";
}

export const AnnouncementsManager = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Promoção Supermercado Central",
      category: "Comercial",
      duration: "0:30",
      type: "comercial",
    },
    {
      id: "2",
      title: "Campanha Doe Sangue",
      category: "Institucional",
      duration: "0:20",
      type: "institucional",
    },
    {
      id: "3",
      title: "Show de Rock - Sábado",
      category: "Eventos",
      duration: "0:15",
      type: "promocional",
    },
    {
      id: "4",
      title: "Farmácia Popular",
      category: "Comercial",
      duration: "0:25",
      type: "comercial",
    },
  ];

  const categories = [
    {
      name: "Anúncios Comerciais",
      items: announcements.filter(a => a.type === "comercial"),
      color: "bg-green-500",
    },
    {
      name: "Campanhas Institucionais",
      items: announcements.filter(a => a.type === "institucional"),
      color: "bg-blue-500",
    },
    {
      name: "Promoções e Eventos",
      items: announcements.filter(a => a.type === "promocional"),
      color: "bg-purple-500",
    },
  ];

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "comercial":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "institucional":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "promocional":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Anúncios</h2>
          <p className="text-muted-foreground">
            Organize e selecione anúncios para sua programação
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Seletor de Avisos */}
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-primary" />
              <span>Seletor de Avisos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedAnnouncement} onValueChange={setSelectedAnnouncement}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um aviso para tocar" />
              </SelectTrigger>
              <SelectContent>
                {announcements.map((announcement) => (
                  <SelectItem key={announcement.id} value={announcement.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{announcement.title}</span>
                      <Badge variant="outline" className="ml-2">
                        {announcement.duration}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedAnnouncement && (
              <div className="p-4 bg-accent/20 rounded-lg border border-accent/30">
                {(() => {
                  const selected = announcements.find(a => a.id === selectedAnnouncement);
                  return selected ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg radio-gradient flex items-center justify-center">
                          <RadioIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{selected.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getTypeColor(selected.type)}>
                              {selected.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {selected.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => togglePlay(selected.id)}
                        className="spotify-gradient hover:opacity-90 text-black"
                      >
                        {playingId === selected.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Biblioteca de Anúncios */}
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RadioIcon className="w-5 h-5 text-accent" />
              <span>Biblioteca de Anúncios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category, index) => (
                <AccordionItem key={category.name} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.items.length}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-accent/30 flex items-center justify-center">
                              <RadioIcon className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.duration}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePlay(item.id)}
                            className="hover:bg-accent/30"
                          >
                            {playingId === item.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
