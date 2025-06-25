
import { Disc3, Music, RadioIcon, BarChart3, Calendar, Mic, Settings, Menu } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface RadioSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedColor: string;
}

export const RadioSidebar = ({ activeTab, setActiveTab, selectedColor }: RadioSidebarProps) => {
  const colorThemes = {
    purple: {
      active: "bg-purple-600 text-white",
      hover: "hover:bg-purple-500/20"
    },
    blue: {
      active: "bg-blue-600 text-white", 
      hover: "hover:bg-blue-500/20"
    },
    green: {
      active: "bg-green-600 text-white",
      hover: "hover:bg-green-500/20"
    },
    red: {
      active: "bg-red-600 text-white",
      hover: "hover:bg-red-500/20"
    }
  };

  const menuItems = [
    { id: "playlists", label: "Playlists", icon: Disc3 },
    { id: "vinhetas", label: "Anúncios", icon: Music },
    { id: "anuncios", label: "Avisos", icon: RadioIcon },
    { id: "promocoes", label: "Promoções", icon: BarChart3 },
    { id: "agendar", label: "Agendar", icon: Calendar },
    { id: "locucao", label: "Locução IA", icon: Mic },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  return (
    <Sidebar className="w-64 border-r border-border/40">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2">
            <SidebarGroupLabel className="text-muted-foreground">
              Menu Principal
            </SidebarGroupLabel>
            <SidebarTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SidebarTrigger>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer
                        ${isActive 
                          ? colorThemes[selectedColor].active 
                          : `text-muted-foreground hover:text-foreground ${colorThemes[selectedColor].hover}`
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
