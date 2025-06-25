
import { useState } from "react";
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AnnouncementsManager } from "./AnnouncementsManager";
import { PlaylistsManager } from "./PlaylistsManager";
import { VinhettasManager } from "./VinhettasManager";
import { ScheduleManager } from "./ScheduleManager";
import { VirtualVoiceManager } from "./VirtualVoiceManager";
import { PromotionsManager } from "./PromotionsManager";
import { useAuth } from "@/contexts/AuthContext";

const AppSidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

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

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => (
                <SidebarMenuItem key={tab.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(tab.id)}
                    className={activeTab === tab.id ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"}
                    title={tab.description}
                  >
                    <tab.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{tab.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const { user } = useAuth();

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
    <SidebarProvider>
      {/* Header with trigger always visible */}
      <header className="fixed top-16 left-0 right-0 z-40 h-12 flex items-center border-b bg-background/95 backdrop-blur">
        <SidebarTrigger className="ml-4" />
        <h2 className="ml-4 text-lg font-semibold">
          {user?.nome ? `Painel - ${user.nome}` : 'Painel de Controle'}
        </h2>
      </header>

      <div className="min-h-screen bg-background pt-28 pb-20 flex w-full">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6">
          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
