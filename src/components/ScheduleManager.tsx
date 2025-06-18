import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AdType = 'vinheta' | 'anuncio' | 'promocao';

interface ScheduledAd {
  id: number;
  name: string;
  type: AdType;
  startDate: string;
  endDate: string;
  hour: string;
  minute: string;
  weekDays: string[];
  isActive: boolean;
}

const weekDays = [
  { id: 'sun', label: 'Dom' },
  { id: 'mon', label: 'Seg' },
  { id: 'tue', label: 'Ter' },
  { id: 'wed', label: 'Qua' },
  { id: 'thu', label: 'Qui' },
  { id: 'fri', label: 'Sex' },
  { id: 'sat', label: 'Sáb' },
];

const adTypes = [
  { value: 'vinheta' as const, label: 'Vinheta' },
  { value: 'anuncio' as const, label: 'Anúncio' },
  { value: 'promocao' as const, label: 'Promoção' },
];

export const ScheduleManager = () => {
  const [scheduledAds, setScheduledAds] = useState<ScheduledAd[]>([
    {
      id: 1,
      name: "Promoção Black Friday",
      type: "promocao",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      hour: "09",
      minute: "00",
      weekDays: ["mon", "tue", "wed", "thu", "fri"],
      isActive: true,
    },
    {
      id: 2,
      name: "Vinheta Manhã",
      type: "vinheta",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      hour: "07",
      minute: "30",
      weekDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      isActive: true,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<ScheduledAd | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "" as AdType | "",
    startDate: "",
    endDate: "",
    hour: "00",
    minute: "00",
    weekDays: [] as string[],
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      hour: "00",
      minute: "00",
      weekDays: [],
      isActive: true,
    });
    setEditingAd(null);
  };

  const handleEdit = (ad: ScheduledAd) => {
    setEditingAd(ad);
    setFormData({
      name: ad.name,
      type: ad.type,
      startDate: ad.startDate,
      endDate: ad.endDate,
      hour: ad.hour,
      minute: ad.minute,
      weekDays: ad.weekDays,
      isActive: ad.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.type) return; // Prevent saving without type selection
    
    if (editingAd) {
      setScheduledAds(prev => prev.map(ad => 
        ad.id === editingAd.id 
          ? { ...ad, ...formData, type: formData.type as AdType }
          : ad
      ));
    } else {
      const newAd: ScheduledAd = {
        id: Date.now(),
        name: formData.name,
        type: formData.type as AdType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        hour: formData.hour,
        minute: formData.minute,
        weekDays: formData.weekDays,
        isActive: formData.isActive,
      };
      setScheduledAds(prev => [...prev, newAd]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setScheduledAds(prev => prev.filter(ad => ad.id !== id));
  };

  const toggleStatus = (id: number) => {
    setScheduledAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  const handleWeekDayToggle = (dayId: string) => {
    setFormData(prev => ({
      ...prev,
      weekDays: prev.weekDays.includes(dayId)
        ? prev.weekDays.filter(d => d !== dayId)
        : [...prev.weekDays, dayId]
    }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vinheta': return 'bg-blue-500';
      case 'anuncio': return 'bg-green-500';
      case 'promocao': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5" />
                Agendamentos de Anúncios
              </CardTitle>
              <p className="text-muted-foreground">
                Gerencie os horários de veiculação dos seus anúncios
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-background">
                <DialogHeader>
                  <DialogTitle>
                    {editingAd ? 'Editar' : 'Novo'} Agendamento
                  </DialogTitle>
                  <DialogDescription>
                    Configure os detalhes do agendamento do anúncio
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome (opcional)</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Promoção Black Friday"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Tipo de Conteúdo</Label>
                      <Select value={formData.type} onValueChange={(value: AdType) => setFormData(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {adTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Data de Início</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Data de Vencimento</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hour">Hora</Label>
                      <Select value={formData.hour} onValueChange={(value) => setFormData(prev => ({ ...prev, hour: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                              {i.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="minute">Minuto</Label>
                      <Select value={formData.minute} onValueChange={(value) => setFormData(prev => ({ ...prev, minute: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 60 }, (_, i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                              :{i.toString().padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Dias da Semana</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {weekDays.map(day => (
                        <div key={day.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={day.id}
                            checked={formData.weekDays.includes(day.id)}
                            onCheckedChange={() => handleWeekDayToggle(day.id)}
                          />
                          <Label htmlFor={day.id} className="text-sm">
                            {day.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    />
                    <Label htmlFor="isActive">
                      Status Ativo
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={!formData.type}>
                    {editingAd ? 'Salvar' : 'Criar'} Agendamento
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {scheduledAds.map((ad) => (
              <Card key={ad.id} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(ad.type)}`} />
                      <div>
                        <h3 className="font-medium text-foreground">
                          {ad.name || `${adTypes.find(t => t.value === ad.type)?.label} - ${ad.hour}:${ad.minute}`}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {ad.hour}:{ad.minute}
                          </span>
                          <span>{ad.startDate} - {ad.endDate}</span>
                          <div className="flex gap-1">
                            {ad.weekDays.map(dayId => (
                              <Badge key={dayId} variant="secondary" className="text-xs">
                                {weekDays.find(d => d.id === dayId)?.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge variant={ad.isActive ? "default" : "secondary"}>
                        {ad.isActive ? "Ativo" : "Bloqueado"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStatus(ad.id)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(ad)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(ad.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {scheduledAds.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum agendamento criado ainda.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
