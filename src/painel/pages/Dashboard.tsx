
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Radio, 
  Users, 
  BarChart3, 
  Music, 
  Megaphone,
  Calendar,
  Mic,
  Upload,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const PainelDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Mock data
  const stats = {
    totalRadios: 12,
    activeUsers: 45,
    totalStreams: 1250,
    revenue: "R$ 8.500"
  };

  const radios = [
    { id: 1, name: "Mix FM", status: "online", listeners: 234, owner: "João Silva" },
    { id: 2, name: "Rock Classic", status: "offline", listeners: 0, owner: "Maria Santos" },
    { id: 3, name: "Pop Hits", status: "online", listeners: 89, owner: "Pedro Costa" },
  ];

  const sections = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "radios", label: "Rádios", icon: Radio },
    { id: "users", label: "Usuários", icon: Users },
    { id: "content", label: "Conteúdo", icon: Music },
    { id: "ads", label: "Anúncios", icon: Megaphone },
    { id: "schedule", label: "Programação", icon: Calendar },
    { id: "voice", label: "Locução IA", icon: Mic },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Rádios</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRadios}</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">+5 hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStreams}</div>
            <p className="text-xs text-muted-foreground">+180 hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue}</div>
            <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Radios */}
      <Card>
        <CardHeader>
          <CardTitle>Rádios Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {radios.map((radio) => (
              <div key={radio.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Radio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{radio.name}</p>
                    <p className="text-sm text-muted-foreground">{radio.owner}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={radio.status === "online" ? "default" : "secondary"}>
                    {radio.status === "online" ? "Online" : "Offline"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {radio.listeners} ouvintes
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRadios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Rádios</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Rádio
        </Button>
      </div>

      <div className="grid gap-4">
        {radios.map((radio) => (
          <Card key={radio.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{radio.name}</h3>
                    <p className="text-muted-foreground">Proprietário: {radio.owner}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge variant={radio.status === "online" ? "default" : "secondary"}>
                      {radio.status === "online" ? "Online" : "Offline"}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {radio.listeners} ouvintes
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      {radio.status === "online" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    const currentSection = sections.find(s => s.id === activeSection);
    
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "radios":
        return renderRadios();
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentSection?.icon && <currentSection.icon className="w-5 h-5" />}
                <span>{currentSection?.label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seção {currentSection?.label} em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Suporte
            </Button>
            <Button variant="outline" size="sm">
              Perfil
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/40 bg-background/50 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-green-600 text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PainelDashboard;
