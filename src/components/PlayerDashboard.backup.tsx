
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Megaphone, 
  Music, 
  Mic, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Heart,
  Settings,
  BarChart3
} from "lucide-react";
import { AnnouncementsManager } from "./AnnouncementsManager";
import { PlaylistsManager } from "./PlaylistsManager";
import { VinhettasManager } from "./VinhettasManager";
import { ScheduleManager } from "./ScheduleManager";
import { VirtualVoiceManager } from "./VirtualVoiceManager";
import { PromotionsManager } from "./PromotionsManager";

export const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");

  const tabs = [
    { 
      id: "announcements", 
      label: "Anúncios", 
      icon: Megaphone,
      description: "Gerencie anúncios publicitários"
    },
    { 
      id: "playlists", 
      label: "Playlists", 
      icon: Music,
      description: "Organize suas músicas"
    },
    { 
      id: "vinhetas", 
      label: "Vinhetas", 
      icon: Mic,
      description: "Vinhetas da rádio"
    },
    { 
      id: "schedule", 
      label: "Programação", 
      icon: Calendar,
      description: "Grade de programação"
    },
    { 
      id: "avisos", 
      label: "Avisos", 
      icon: MessageSquare,
      description: "Avisos e comunicados"
    },
    { 
      id: "especiais", 
      label: "Especiais Sazonais", 
      icon: Sparkles,
      description: "Conteúdo sazonal"
    },
    { 
      id: "spots", 
      label: "Spots de Cortesia", 
      icon: Heart,
      description: "Spots gratuitos"
    },
    { 
      id: "virtual-voice", 
      label: "Locução Virtual", 
      icon: Settings,
      description: "Locuções automáticas"
    },
    { 
      id: "reports", 
      label: "Relatórios", 
      icon: BarChart3,
      description: "Relatórios e estatísticas"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "announcements":
        return <AnnouncementsManager />;
      case "playlists":
        return <PlaylistsManager />;
      case "vinhetas":
        return <VinhettasManager />;
      case "schedule":
        return <ScheduleManager />;
      case "virtual-voice":
        return <VirtualVoiceManager />;
      case "especiais":
      case "spots":
      case "avisos":
        return <PromotionsManager />;
      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Relatórios e Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade de relatórios será implementada em breve.
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <AnnouncementsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 text-xs lg:text-sm"
                title={tab.description}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="transition-all duration-300 ease-in-out">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {renderContent()}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};
