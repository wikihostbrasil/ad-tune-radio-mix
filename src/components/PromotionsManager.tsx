
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BarChart3, Calendar, Clock, Play, Pause, TrendingUp } from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  type: "discount" | "event" | "special";
  priority: "high" | "medium" | "low";
}

export const PromotionsManager = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      title: "Black Friday - 50% OFF",
      description: "Mega promoção de Black Friday em toda a loja",
      startDate: "2024-11-25",
      endDate: "2024-11-30",
      active: true,
      type: "discount",
      priority: "high",
    },
    {
      id: "2",
      title: "Show de Rock Nacional",
      description: "Grande evento no estádio municipal - ingressos limitados",
      startDate: "2024-12-15",
      endDate: "2024-12-15",
      active: true,
      type: "event",
      priority: "medium",
    },
    {
      id: "3",
      title: "Natal Solidário",
      description: "Campanha de arrecadação de brinquedos",
      startDate: "2024-12-01",
      endDate: "2024-12-24",
      active: false,
      type: "special",
      priority: "medium",
    },
  ]);

  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePromotion = (id: string) => {
    setPromotions(prev =>
      prev.map(p => p.id === id ? { ...p, active: !p.active } : p)
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "discount":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "event":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "special":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Promoções</h2>
          <p className="text-muted-foreground">
            Configure campanhas promocionais e eventos especiais
          </p>
        </div>
        <Button className="spotify-gradient hover:opacity-90 text-black font-medium">
          <TrendingUp className="w-4 h-4 mr-2" />
          Nova Promoção
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ativas</p>
                <p className="text-2xl font-bold text-foreground">
                  {promotions.filter(p => p.active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold text-foreground">
                  {promotions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alta Prioridade</p>
                <p className="text-2xl font-bold text-foreground">
                  {promotions.filter(p => p.priority === "high").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions List */}
      <div className="grid gap-4">
        {promotions.map((promotion) => (
          <Card
            key={promotion.id}
            className={`
              border transition-all duration-300 hover:shadow-lg
              ${
                promotion.active
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/40 bg-card/50"
              }
            `}
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-lg radio-gradient flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{promotion.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {promotion.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge className={getTypeColor(promotion.type)}>
                        {promotion.type === "discount" ? "Desconto" : 
                         promotion.type === "event" ? "Evento" : "Especial"}
                      </Badge>
                      <Badge className={getPriorityColor(promotion.priority)}>
                        {promotion.priority === "high" ? "Alta" :
                         promotion.priority === "medium" ? "Média" : "Baixa"} Prioridade
                      </Badge>
                      <Badge
                        variant={promotion.active ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {promotion.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlay(promotion.id)}
                    className="hover:bg-accent/50"
                  >
                    {playingId === promotion.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`promo-switch-${promotion.id}`} className="text-sm">
                      Ativar
                    </Label>
                    <Switch
                      id={`promo-switch-${promotion.id}`}
                      checked={promotion.active}
                      onCheckedChange={() => togglePromotion(promotion.id)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Início:</span>
                    <span className="font-medium">{formatDate(promotion.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Fim:</span>
                    <span className="font-medium">{formatDate(promotion.endDate)}</span>
                  </div>
                </div>

                {playingId === promotion.id && (
                  <div className="flex items-center space-x-2 text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-medium">Reproduzindo preview...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
