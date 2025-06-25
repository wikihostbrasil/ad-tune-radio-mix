
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RadioSidebar } from "@/radio/components/RadioSidebar";
import { Header } from "@/radio/components/Header";
import { Player } from "@/radio/components/Player";
import { PlaylistsManager } from "@/radio/components/PlaylistsManager";
import { VinhettasManager } from "@/radio/components/VinhettasManager";
import { AnnouncementsManager } from "@/radio/components/AnnouncementsManager";
import { PromotionsManager } from "@/radio/components/PromotionsManager";
import { ScheduleManager } from "@/radio/components/ScheduleManager";
import { VirtualVoiceManager } from "@/radio/components/VirtualVoiceManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const RadioDashboard = () => {
  const [activeTab, setActiveTab] = useState("playlists");
  const [selectedColor, setSelectedColor] = useState("purple");

  const renderContent = (tabId: string) => {
    switch (tabId) {
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
      case "configuracoes":
        return (
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-foreground">Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configurações do sistema em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return <PlaylistsManager />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Header fixo */}
        <Header selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        
        {/* Layout principal com sidebar - ajuste para não ficar sob o header */}
        <div className="flex h-screen pt-16">
          <RadioSidebar activeTab={activeTab} setActiveTab={setActiveTab} selectedColor={selectedColor} />
          
          {/* Conteúdo principal com scroll customizado */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 pb-24">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {renderContent(activeTab)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollArea>
          </main>
        </div>

        {/* Player fixo no footer */}
        <Player />
      </div>
    </SidebarProvider>
  );
};

export default RadioDashboard;
