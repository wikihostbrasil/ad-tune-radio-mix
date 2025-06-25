
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { RadioSidebar } from "@/radio/components/RadioSidebar";
import { Header } from "@/radio/components/Header";
import { Player } from "@/radio/components/Player";
import { PlaylistsManager } from "@/radio/components/PlaylistsManager";
import { VinhettasManager } from "@/radio/components/VinhettasManager";
import { AnnouncementsManager } from "@/radio/components/AnnouncementsManager";
import { PromotionsManager } from "@/radio/components/PromotionsManager";
import { ScheduleManager } from "@/radio/components/ScheduleManager";
import { VirtualVoiceManager } from "@/radio/components/VirtualVoiceManager";
import { ScrollArea } from "@/components/ui/scroll-area";

const RadioDashboard = () => {
  const [activeTab, setActiveTab] = useState("playlists");
  const [selectedColor] = useState("purple");

  const renderContent = () => {
    switch (activeTab) {
      case "playlists":
        return <PlaylistsManager />;
      case "vinhetas":
        return <VinhettasManager />;
      case "anuncios":
        return <AnnouncementsManager />;
      case "promocoes":
        return <PromotionsManager />;
      case "agendar":
        return <ScheduleManager />;
      case "locucao":
        return <VirtualVoiceManager />;
      default:
        return <PlaylistsManager />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <RadioSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          selectedColor={selectedColor}
        />
        
        <SidebarInset className="flex-1 flex flex-col">
          {/* Header fixo */}
          <Header />
          
          {/* Conteúdo principal com scroll customizado */}
          <div className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1">
              <div className="p-6 pb-24">
                {renderContent()}
              </div>
            </ScrollArea>
          </div>
          
          {/* Player fixo no footer */}
          <Player />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default RadioDashboard;
