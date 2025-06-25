
import { Disc3, Music, RadioIcon, BarChart3, Calendar, Mic, Settings } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";

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
    <Sidebar className="w-64 border-r border-border/40 z-30">
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-4 py-2">
            Menu Principal
          </SidebarGroupLabel>
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
                        flex items-center space-x-3 px-4 py-3 mx-2 rounded-md transition-all duration-200 cursor-pointer
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
