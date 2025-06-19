
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioIcon, Music, Settings, BarChart3, Calendar, Disc3, Mic, MessageSquare } from "lucide-react";
import { VinhettasManager } from "@/components/VinhettasManager";
import { AnnouncementsManager } from "@/components/AnnouncementsManager";
import { PromotionsManager } from "@/components/PromotionsManager";
import { PlaylistsManager } from "@/components/PlaylistsManager";
import { ScheduleManager } from "@/components/ScheduleManager";
import { VirtualVoiceManager } from "@/components/VirtualVoiceManager";
import { Header } from "@/components/Header";
import { Player } from "@/components/Player";
import { SuggestionsModal } from "@/components/SuggestionsModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState("playlists");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const tabs = [
    { id: "playlists", label: "Playlists", icon: Disc3 },
    { id: "vinhetas", label: "Anúncios", icon: Music },
    { id: "anuncios", label: "Avisos", icon: RadioIcon },
    { id: "promocoes", label: "Promoções", icon: BarChart3 },
    { id: "agendar", label: "Agendar Anúncios", icon: Calendar },
    { id: "locucao", label: "Locução Virtual (IA)", icon: Mic },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

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
    <div className="h-screen bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden flex flex-col">
      <Header />
      
      {/* Main content area with fixed header and footer */}
      <div className="flex-1 flex flex-col pt-16 pb-24 overflow-hidden">
        {/* Scrollable content area including hero */}
        <ScrollArea className="flex-1">
          <div className="pb-8">
            {/* Radio Banner - now scrollable */}
            <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 h-full flex items-center px-4">
                <div className="text-white">
                  <h1 className="text-3xl font-bold">Rádio Mix FM</h1>
                  <p className="text-blue-100 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-4 pt-8">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 p-1 bg-card/50 rounded-lg border border-border/40">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                        ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Content */}
              <div className="animate-fade-in">
                {renderContent()}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Floating Suggestions Button */}
      <Button 
        onClick={() => setShowSuggestions(true)}
        className="fixed bottom-28 right-6 z-40 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        size="icon"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      <Player />
      <SuggestionsModal 
        isOpen={showSuggestions} 
        onClose={() => setShowSuggestions(false)} 
      />
    </div>
  );
};

export default Index;
