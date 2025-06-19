
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Plus, Trash2, Check, ChevronsUpDown } from "lucide-react";
import { Play, Pause, RadioIcon } from "lucide-react";
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

interface ExclusiveNoticesProps {
  announcements: Announcement[];
}

export const ExclusiveNotices = ({ announcements }: ExclusiveNoticesProps) => {
  const [selectedAnnouncementExclusive, setSelectedAnnouncementExclusive] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [scheduledExclusive, setScheduledExclusive] = useState<ScheduledAnnouncement[]>([]);
  const [queryExclusive, setQueryExclusive] = useState('');
  const [queryScheduledExclusive, setQueryScheduledExclusive] = useState<{[key: string]: string}>({});

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

  const addScheduledAnnouncement = () => {
    const newScheduled: ScheduledAnnouncement = {
      id: Date.now().toString(),
      announcementId: "",
      frequency: 5,
      type: "exclusivo",
    };
    setScheduledExclusive(prev => [...prev, newScheduled]);
  };

  const removeScheduledAnnouncement = (id: string) => {
    setScheduledExclusive(prev => prev.filter(item => item.id !== id));
  };

  const updateScheduledAnnouncement = (id: string, field: string, value: any) => {
    setScheduledExclusive(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const updateFrequency = (id: string, change: number) => {
    setScheduledExclusive(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, frequency: Math.max(1, Math.min(50, item.frequency + change)) }
          : item
      )
    );
  };

  return (
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
                    <ChevronsUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
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
                onClick={addScheduledAnnouncement}
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
                      onChange={(value) => updateScheduledAnnouncement(scheduled.id, "announcementId", value)}
                    >
                      <div className="relative">
                        <Combobox.Input
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-10"
                          displayValue={(announcementId: string) => getSelectedOption(announcementId)?.label || ''}
                          onChange={(event) => setQueryScheduledExclusive(prev => ({ ...prev, [scheduled.id]: event.target.value }))}
                          placeholder="Selecione o aviso"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronsUpDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
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
                    onClick={() => updateFrequency(scheduled.id, -1)}
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
                    onClick={() => updateFrequency(scheduled.id, 1)}
                    className="w-8 h-8 p-0"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>

                <span className="text-sm">músicas</span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeScheduledAnnouncement(scheduled.id)}
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
};
