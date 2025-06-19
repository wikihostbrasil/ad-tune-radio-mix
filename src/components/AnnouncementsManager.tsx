import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Plus, Trash2, Check, ChevronUpDown } from "lucide-react";
import { Play, Pause, RadioIcon, Volume2, Users, Car } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeManagementModal } from "@/components/EmployeeManagementModal";
import { VehicleManager } from "@/components/VehicleManager";
import { Combobox } from '@headlessui/react';
import { cn } from "@/lib/utils";

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

interface SelectOption {
  value: string;
  label: string;
  duration: string;
}

export const AnnouncementsManager = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string>("");
  const [selectedAnnouncementExclusive, setSelectedAnnouncementExclusive] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeePlayingId, setEmployeePlayingId] = useState<string | null>(null);
  const [vehiclePlayingId, setVehiclePlayingId] = useState<string | null>(null);
  
  const [scheduledGeneral, setScheduledGeneral] = useState<ScheduledAnnouncement[]>([]);
  const [scheduledExclusive, setScheduledExclusive] = useState<ScheduledAnnouncement[]>([]);

  // Query states for comboboxes
  const [queryGeneral, setQueryGeneral] = useState('');
  const [queryExclusive, setQueryExclusive] = useState('');
  const [queryScheduledGeneral, setQueryScheduledGeneral] = useState<{[key: string]: string}>({});
  const [queryScheduledExclusive, setQueryScheduledExclusive] = useState<{[key: string]: string}>({});

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

  // Convert announcements to select options
  const announcementOptions: SelectOption[] = announcements.map(announcement => ({
    value: announcement.id,
    label: announcement.title,
    duration: announcement.duration
  }));

  // Filter functions for comboboxes
  const getFilteredAnnouncements = (query: string) => {
    return query === ''
      ? announcementOptions
      : announcementOptions.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );
  };

  const getSelectedAnnouncement = (id: string) => {
    return announcements.find(a => a.id === id);
  };

  const getSelectedOption = (id: string) => {
    return announcementOptions.find(option => option.value === id);
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const toggleEmployeePlay = () => {
    if (employeePlayingId) {
      setEmployeePlayingId(null);
    } else {
      setEmployeePlayingId("employee-play");
      setTimeout(() => setEmployeePlayingId(null), 3000);
    }
  };

  const toggleVehiclePlay = () => {
    if (vehiclePlayingId) {
      setVehiclePlayingId(null);
    } else {
      setVehiclePlayingId("vehicle-play");
      setTimeout(() => setVehiclePlayingId(null), 3000);
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
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Selection */}
      <div className="space-y-4">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <span>Selecionar Aviso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Combobox value={selectedAnnouncement} onChange={setSelectedAnnouncement}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-10"
                    displayValue={(announcementId: string) => getSelectedOption(announcementId)?.label || ''}
                    onChange={(event) => setQueryGeneral(event.target.value)}
                    placeholder="Buscar e selecionar um aviso..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover border border-border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {getFilteredAnnouncements(queryGeneral).map((option) => (
                    <Combobox.Option
                      key={option.value}
                      className={({ active }) =>
                        cn(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                              {option.label}
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {option.duration}
                            </Badge>
                          </div>
                          {selected ? (
                            <span className={cn('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-accent-foreground' : 'text-foreground')}>
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                  {getFilteredAnnouncements(queryGeneral).length === 0 && queryGeneral !== '' && (
                    <div className="relative cursor-default select-none py-2 px-4 text-muted-foreground">
                      Nenhum aviso encontrado.
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>
            </div>

            {/* Selected announcement preview */}
            {selectedAnnouncement && (
              <div className="p-3 bg-accent/10 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {getSelectedAnnouncement(selectedAnnouncement)?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {getSelectedAnnouncement(selectedAnnouncement)?.category}
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
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Programming */}
      <div className="space-y-4">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Programe seus anúncios gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Programação automática:</p>
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
                  <div className="relative flex-1">
                    <Combobox 
                      value={scheduled.announcementId} 
                      onChange={(value) => updateScheduledAnnouncement(scheduled.id, "announcementId", value, "geral")}
                    >
                      <div className="relative">
                        <Combobox.Input
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-10"
                          displayValue={(announcementId: string) => getSelectedOption(announcementId)?.label || ''}
                          onChange={(event) => setQueryScheduledGeneral(prev => ({ ...prev, [scheduled.id]: event.target.value }))}
                          placeholder="Selecione o aviso"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </Combobox.Button>
                      </div>
                      <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover border border-border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {getFilteredAnnouncements(queryScheduledGeneral[scheduled.id] || '').map((option) => (
                          <Combobox.Option
                            key={option.value}
                            className={({ active }) =>
                              cn(
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                              )
                            }
                            value={option.value}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                                    {option.label}
                                  </span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {option.duration}
                                  </Badge>
                                </div>
                                {selected ? (
                                  <span className={cn('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-accent-foreground' : 'text-foreground')}>
                                    <Check className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Combobox>
                  </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ExclusiveNoticesContent = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Selection */}
      <div className="space-y-4">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RadioIcon className="w-5 h-5 text-accent" />
              <span>Selecionar Aviso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Combobox value={selectedAnnouncementExclusive} onChange={setSelectedAnnouncementExclusive}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-10"
                    displayValue={(announcementId: string) => getSelectedOption(announcementId)?.label || ''}
                    onChange={(event) => setQueryExclusive(event.target.value)}
                    placeholder="Buscar e selecionar um aviso..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover border border-border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {getFilteredAnnouncements(queryExclusive).map((option) => (
                    <Combobox.Option
                      key={option.value}
                      className={({ active }) =>
                        cn(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between">
                            <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                              {option.label}
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {option.duration}
                            </Badge>
                          </div>
                          {selected ? (
                            <span className={cn('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-accent-foreground' : 'text-foreground')}>
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                  {getFilteredAnnouncements(queryExclusive).length === 0 && queryExclusive !== '' && (
                    <div className="relative cursor-default select-none py-2 px-4 text-muted-foreground">
                      Nenhum aviso encontrado.
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>
            </div>

            {/* Selected announcement preview */}
            {selectedAnnouncementExclusive && (
              <div className="p-3 bg-accent/10 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {getSelectedAnnouncement(selectedAnnouncementExclusive)?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {getSelectedAnnouncement(selectedAnnouncementExclusive)?.category}
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
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Programming */}
      <div className="space-y-4">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Programe seus anúncios exclusivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Programação automática:</p>
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
                  <div className="relative flex-1">
                    <Combobox 
                      value={scheduled.announcementId} 
                      onChange={(value) => updateScheduledAnnouncement(scheduled.id, "announcementId", value, "exclusivo")}
                    >
                      <div className="relative">
                        <Combobox.Input
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-10"
                          displayValue={(announcementId: string) => getSelectedOption(announcementId)?.label || ''}
                          onChange={(event) => setQueryScheduledExclusive(prev => ({ ...prev, [scheduled.id]: event.target.value }))}
                          placeholder="Selecione o aviso"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </Combobox.Button>
                      </div>
                      <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover border border-border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {getFilteredAnnouncements(queryScheduledExclusive[scheduled.id] || '').map((option) => (
                          <Combobox.Option
                            key={option.value}
                            className={({ active }) =>
                              cn(
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                              )
                            }
                            value={option.value}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                                    {option.label}
                                  </span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {option.duration}
                                  </Badge>
                                </div>
                                {selected ? (
                                  <span className={cn('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-accent-foreground' : 'text-foreground')}>
                                    <Check className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Combobox>
                  </div>
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
          </CardContent>
        </Card>
      </div>
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
                  <Button 
                    className="w-full"
                    onClick={toggleEmployeePlay}
                  >
                    {employeePlayingId ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {employeePlayingId ? 'Pausar' : 'Tocar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="veiculos" className="mt-6">
          <VehicleManager onPlayToggle={toggleVehiclePlay} isPlaying={!!vehiclePlayingId} />
        </TabsContent>
      </Tabs>

      <EmployeeManagementModal 
        isOpen={showEmployeeModal} 
        onClose={() => setShowEmployeeModal(false)} 
      />
    </div>
  );
};
