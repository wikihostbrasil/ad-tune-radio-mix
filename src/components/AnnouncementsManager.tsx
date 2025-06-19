import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Play, Pause, RadioIcon, Volume2, Users, Car } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeManagementModal } from "@/components/EmployeeManagementModal";
import { VehicleManager } from "@/components/VehicleManager";

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
  const [selectedAnnouncementExclusive, setSelectedAnnouncementExclusive] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  
  const [scheduledGeneral, setScheduledGeneral] = useState<ScheduledAnnouncement[]>([]);
  const [scheduledExclusive, setScheduledExclusive] = useState<ScheduledAnnouncement[]>([]);

  // Load announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements.json');
        const data: Announcement[] = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
        // Fallback data
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
        ]);
      }
    };

    fetchAnnouncements();
  }, []);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 3000);
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
    announcement.title.toLowerCase().includes("") ||
    announcement.category.toLowerCase().includes("")
  );

  const GeneralNoticesContent = () => (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-blue-500" />
            <span>Avisos Gerais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Select with search */}
          <div>
            <Select value={selectedAnnouncement} onValueChange={setSelectedAnnouncement}>
              <SelectTrigger>
                <SelectValue placeholder="Buscar e selecionar um aviso..." />
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
          </div>

          {/* Selected announcement preview */}
          {selectedAnnouncement && (
            <div className="p-3 bg-accent/10 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    {announcements.find(a => a.id === selectedAnnouncement)?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {announcements.find(a => a.id === selectedAnnouncement)?.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePlay(selectedAnnouncement)}
                >
                  {playingId === selectedAnnouncement ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

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
                <div className="flex items-center space-x-2 flex-1">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlay(scheduled.id)}
                  >
                    {playingId === scheduled.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>

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
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ExclusiveNoticesContent = () => (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RadioIcon className="w-5 h-5 text-accent" />
            <span>Avisos Exclusivos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Select with search */}
          <div>
            <Select value={selectedAnnouncementExclusive} onValueChange={setSelectedAnnouncementExclusive}>
              <SelectTrigger>
                <SelectValue placeholder="Buscar e selecionar um aviso..." />
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
          </div>

          {/* Selected announcement preview */}
          {selectedAnnouncementExclusive && (
            <div className="p-3 bg-accent/10 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    {announcements.find(a => a.id === selectedAnnouncementExclusive)?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {announcements.find(a => a.id === selectedAnnouncementExclusive)?.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePlay(selectedAnnouncementExclusive)}
                >
                  {playingId === selectedAnnouncementExclusive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

          {/* Scheduled Exclusive Announcements */}
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
                <div className="flex items-center space-x-2 flex-1">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlay(scheduled.id)}
                  >
                    {playingId === scheduled.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>

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
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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

      <Tabs defaultValue="avisos-gerais" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="avisos-gerais" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Avisos Gerais</span>
          </TabsTrigger>
          <TabsTrigger value="avisos-exclusivos" className="flex items-center space-x-2">
            <RadioIcon className="w-4 h-4" />
            <span>Avisos Exclusivos</span>
          </TabsTrigger>
          <TabsTrigger value="funcionarios" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Funcionários</span>
          </TabsTrigger>
          <TabsTrigger value="veiculos" className="flex items-center space-x-2">
            <Car className="w-4 h-4" />
            <span>Veículos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="avisos-gerais" className="mt-6">
          <GeneralNoticesContent />
        </TabsContent>
        
        <TabsContent value="avisos-exclusivos" className="mt-6">
          <ExclusiveNoticesContent />
        </TabsContent>
        
        <TabsContent value="funcionarios" className="mt-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>Funcionários</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setShowEmployeeModal(true)}
                >
                  Nomes
                </Button>
                <Button variant="outline">
                  Chamadas
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium mb-2 block">Frase Início</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Atenção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="atencao">Atenção</SelectItem>
                      <SelectItem value="chamando">Chamando</SelectItem>
                      <SelectItem value="procuramos">Procuramos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nome da pessoa..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Chamada</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Telefone ramal..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telefone1">Telefone ramal 1</SelectItem>
                      <SelectItem value="telefone2">Telefone ramal 2</SelectItem>
                      <SelectItem value="recepcao">Recepção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Prioridade</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Normal..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Tocar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="veiculos" className="mt-6">
          <VehicleManager />
        </TabsContent>
      </Tabs>

      <EmployeeManagementModal 
        isOpen={showEmployeeModal} 
        onClose={() => setShowEmployeeModal(false)} 
      />
    </div>
  );
};
