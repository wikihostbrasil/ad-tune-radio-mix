import { useState, useEffect } from "react";
import { Volume2, RadioIcon, Users, Car } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralNotices } from "@/components/announcements/GeneralNotices";
import { ExclusiveNotices } from "@/components/announcements/ExclusiveNotices";
import { EmployeesTab } from "@/components/announcements/EmployeesTab";
import { VehiclesTab } from "@/components/announcements/VehiclesTab";

interface Announcement {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: "comercial" | "institucional" | "promocional";
}

export const AnnouncementsManager = () => {
  console.log("AnnouncementsManager rendering...");
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Promoção Supermercado Central",
      category: "Comercial",
      duration: "0:30",
      type: "comercial",
    },
    {
      id: "2",
      title: "Campanha Doe Sangue",
      category: "Institucional",
      duration: "0:20",
      type: "institucional",
    },
    {
      id: "3",
      title: "Show de Rock - Sábado",
      category: "Eventos",
      duration: "0:15",
      type: "promocional",
    },
  ]);

  // Load announcements from API as enhancement, but don't block loading
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements.json');
        if (response.ok) {
          const data: Announcement[] = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.log('Using fallback announcements data');
        // Keep fallback data that was already set in useState
      }
    };

    fetchAnnouncements();
  }, []);

  console.log("Announcements data:", announcements);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Avisos</h2>
          <p className="text-muted-foreground">
            Organize e configure seus avisos para programação automática
          </p>
        </div>
      </div>

      <Tabs defaultValue="avisos-gerais" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="avisos-gerais" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Avisos Gerais</span>
          </TabsTrigger>
          <TabsTrigger value="avisos-exclusivos" className="flex items-center space-x-2">
            <RadioIcon className="w-4 h-4" />
            <span>Avisos Exclusivos</span>
          </TabsTrigger>
          <TabsTrigger value="funcionarios" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Funcionários</span>
          </TabsTrigger>
          <TabsTrigger value="veiculos" className="flex items-center space-x-2">
            <Car className="w-4 h-4" />
            <span>Veículos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="avisos-gerais" className="mt-6">
          <GeneralNotices announcements={announcements} />
        </TabsContent>
        
        <TabsContent value="avisos-exclusivos" className="mt-6">
          <ExclusiveNotices announcements={announcements} />
        </TabsContent>
        
        <TabsContent value="funcionarios" className="mt-6">
          <EmployeesTab />
        </TabsContent>
        
        <TabsContent value="veiculos" className="mt-6">
          <VehiclesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
