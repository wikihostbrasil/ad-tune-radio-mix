import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { Play, Pause, RadioIcon, Clock, Volume2, Search } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: "comercial" | "institucional" | "promocional";
}

interface ScheduledAnnouncement {
  id: string;
  announcementId: string;
  frequency: number;
  type: "geral" | "exclusivo";
}

export const AnnouncementsManager = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  const [scheduledGeneral, setScheduledGeneral] = useState<ScheduledAnnouncement[]>([]);
  const [scheduledExclusive, setScheduledExclusive] = useState<ScheduledAnnouncement[]>([]);

  // Carregar anúncios da API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements.json');
        const data: Announcement[] = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
        // Fallback para dados estáticos se a API falhar
        setAnnouncements([
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
        ]);
      }
    };

    fetchAnnouncements();
  }, []);

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

  const addScheduledAnnouncement = (type: "geral" | "exclusivo") => {
    const newScheduled: ScheduledAnnouncement = {
      id: Date.now().toString(),
      announcementId: "",
      frequency: 5,
      type,
    };

    if (type === "geral") {
      setScheduledGeneral(prev => [...prev, newScheduled]);
    } else {
      setScheduledExclusive(prev => [...prev, newScheduled]);
    }
  };

  const removeScheduledAnnouncement = (id: string, type: "geral" | "exclusivo") => {
    if (type === "geral") {
      setScheduledGeneral(prev => prev.filter(item => item.id !== id));
    } else {
      setScheduledExclusive(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateScheduledAnnouncement = (id: string, field: string, value: any, type: "geral" | "exclusivo") => {
    const updateFn = (prev: ScheduledAnnouncement[]) => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item);

    if (type === "geral") {
      setScheduledGeneral(updateFn);
    } else {
      setScheduledExclusive(updateFn);
    }
  };

  const updateFrequency = (id: string, change: number, type: "geral" | "exclusivo") => {
    const updateFn = (prev: ScheduledAnnouncement[]) =>
      prev.map(item =>
        item.id === id
          ? { ...item, frequency: Math.max(1, Math.min(50, item.frequency + change)) }
          : item
      );

    if (type === "geral") {
      setScheduledGeneral(updateFn);
    } else {
      setScheduledExclusive(updateFn);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Avisos</h2>
          <p className="text-muted-foreground">
            Organize e configure seus avisos para programação automática
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Avisos Gerais */}
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <span>Avisos Gerais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar um aviso/anúncio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedAnnouncement} onValueChange={setSelectedAnnouncement}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um aviso para tocar" />
              </SelectTrigger>
              <SelectContent>
                {filteredAnnouncements.map((announcement) => (
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

            {/* Scheduled General Announcements */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Programe seus anúncios gerais:</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addScheduledAnnouncement("geral")}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {scheduledGeneral.map((scheduled) => (
                <div key={scheduled.id} className="flex items-center space-x-2 p-3 bg-accent/10 rounded-lg border">
                  <Select 
                    value={scheduled.announcementId} 
                    onValueChange={(value) => updateScheduledAnnouncement(scheduled.id, "announcementId", value, "geral")}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione o aviso" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcements.map((announcement) => (
                        <SelectItem key={announcement.id} value={announcement.id}>
                          {announcement.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-sm">tocar a cada</span>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(scheduled.id, -1, "geral")}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-medium">{scheduled.frequency}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(scheduled.id, 1, "geral")}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>

                  <span className="text-sm">músicas</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScheduledAnnouncement(scheduled.id, "geral")}
                    className="text-destructive hover:text-destructive"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Avisos Exclusivos */}
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RadioIcon className="w-5 h-5 text-accent" />
              <span>Avisos Exclusivos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Programe seus anúncios exclusivos:</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => addScheduledAnnouncement("exclusivo")}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {scheduledExclusive.map((scheduled) => (
                <div key={scheduled.id} className="flex items-center space-x-2 p-3 bg-accent/10 rounded-lg border">
                  <Select 
                    value={scheduled.announcementId} 
                    onValueChange={(value) => updateScheduledAnnouncement(scheduled.id, "announcementId", value, "exclusivo")}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione o aviso" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcements.map((announcement) => (
                        <SelectItem key={announcement.id} value={announcement.id}>
                          {announcement.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-sm">tocar a cada</span>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(scheduled.id, -1, "exclusivo")}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-medium">{scheduled.frequency}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFrequency(scheduled.id, 1, "exclusivo")}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>

                  <span className="text-sm">músicas</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScheduledAnnouncement(scheduled.id, "exclusivo")}
                    className="text-destructive hover:text-destructive"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
