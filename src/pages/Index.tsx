
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioIcon, Music, Settings, BarChart3 } from "lucide-react";
import { VinhettasManager } from "@/components/VinhettasManager";
import { AnnouncementsManager } from "@/components/AnnouncementsManager";
import { PromotionsManager } from "@/components/PromotionsManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("vinhetas");

  const tabs = [
    { id: "vinhetas", label: "Vinhetas", icon: Music },
    { id: "anuncios", label: "Anúncios", icon: RadioIcon },
    { id: "promocoes", label: "Promoções", icon: BarChart3 },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "vinhetas":
        return <VinhettasManager />;
      case "anuncios":
        return <AnnouncementsManager />;
      case "promocoes":
        return <PromotionsManager />;
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
        return <VinhettasManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full spotify-gradient flex items-center justify-center">
              <RadioIcon className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Radio Mix Studio
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus anúncios e vinhetas profissionalmente
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit">
            <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
            Sistema Online
          </Badge>
        </div>

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
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
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
  );
};

export default Index;
