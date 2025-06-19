import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Developers = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [selectedColor, setSelectedColor] = useState("blue");

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const codeBlocks = [
    {
      id: "header",
      title: "Header com Avatar e Dropdown",
      description: "Header fixo com logo, nome da rádio, toggle de tema e dropdown do usuário",
      html: `<!-- Header -->
<header class="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur border-b border-border">
  <div class="container mx-auto h-full flex items-center justify-between px-4 lg:px-6">
    <!-- Logo e Nome da Rádio -->
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
        <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold text-foreground">Rádio Mix FM</h1>
        <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
          <div class="w-1.5 h-1.5 rounded-full bg-primary mr-1 animate-pulse inline-block"></div>
          No Ar
        </span>
      </div>
    </div>
    
    <!-- Controles -->
    <div class="flex items-center space-x-3">
      <button class="p-2 text-muted-foreground hover:text-foreground rounded-md">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59z"/>
        </svg>
      </button>
      <div class="relative">
        <button class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>`,
      css: `.spotify-gradient {
  background: linear-gradient(135deg, #1db954 0%, #1ed760 100%);
}

.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.6);
}`
    },
    {
      id: "navigation",
      title: "Menu de Navegação em Abas",
      description: "Sistema de abas para navegação entre diferentes seções",
      html: `<!-- Navigation Tabs -->
<div class="flex flex-wrap gap-2 mb-6 p-1 bg-card/50 rounded-lg border border-border/40">
  <button class="flex items-center space-x-2 px-4 py-2 rounded-md bg-primary text-primary-foreground shadow-lg scale-105 transition-all duration-200">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
    <span class="font-medium">Playlists</span>
  </button>
  <button class="flex items-center space-x-2 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55c-0.59-0.34-1.27-0.55-2-0.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
    <span class="font-medium">Vinhetas</span>
  </button>
</div>`,
      js: `// Navegação entre abas
const [activeTab, setActiveTab] = useState("playlists");

const tabs = [
  { id: "playlists", label: "Playlists", icon: "disc" },
  { id: "vinhetas", label: "Vinhetas", icon: "music" },
  { id: "anuncios", label: "Anúncios", icon: "radio" },
];

const handleTabClick = (tabId) => {
  setActiveTab(tabId);
};`
    },
    {
      id: "player",
      title: "Player de Música (Footer)",
      description: "Player fixo no footer similar ao Spotify",
      html: `<!-- Player Footer -->
<div class="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border">
  <div class="container mx-auto px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Info da Música -->
      <div class="flex items-center space-x-3 flex-1">
        <div class="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-0.59-0.34-1.27-0.55-2-0.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">Nome da Música</p>
          <p class="text-xs text-muted-foreground">Artista</p>
        </div>
      </div>
      
      <!-- Controles -->
      <div class="flex items-center space-x-4">
        <button class="p-2 text-muted-foreground hover:text-foreground">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        <button class="p-3 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <button class="p-2 text-muted-foreground hover:text-foreground">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
      
      <!-- Volume -->
      <div class="flex items-center space-x-2 flex-1 justify-end">
        <svg class="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
        <div class="w-24 h-1 bg-secondary rounded-full">
          <div class="w-1/2 h-full bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mt-2">
      <div class="w-full h-1 bg-secondary rounded-full">
        <div class="w-1/3 h-full bg-primary rounded-full"></div>
      </div>
      <div class="flex justify-between text-xs text-muted-foreground mt-1">
        <span>1:23</span>
        <span>3:45</span>
      </div>
    </div>
  </div>
</div>`
    },
    {
      id: "cards",
      title: "Cards de Conteúdo",
      description: "Cards responsivos para exibir conteúdo das diferentes seções",
      html: `<!-- Card Container -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Card Item -->
  <div class="bg-card border border-border/40 rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-foreground">Título do Card</h3>
      <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Ativo</span>
    </div>
    <p class="text-muted-foreground text-sm mb-4">
      Descrição do conteúdo do card com informações relevantes.
    </p>
    <div class="flex justify-between items-center">
      <span class="text-xs text-muted-foreground">Criado em 18/06/2025</span>
      <div class="flex space-x-2">
        <button class="p-2 text-muted-foreground hover:text-foreground">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="p-2 text-destructive hover:text-destructive/80">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>`
    },
    {
      id: "forms",
      title: "Formulários",
      description: "Formulários para adicionar e editar conteúdo",
      html: `<!-- Form -->
<div class="bg-card border border-border/40 rounded-lg p-6">
  <h2 class="text-xl font-semibold text-foreground mb-6">Adicionar Novo Item</h2>
  <form class="space-y-4">
    <!-- Input Text -->
    <div>
      <label class="block text-sm font-medium text-foreground mb-2">Nome</label>
      <input 
        type="text" 
        class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Digite o nome..."
      />
    </div>
    
    <!-- Select -->
    <div>
      <label class="block text-sm font-medium text-foreground mb-2">Categoria</label>
      <select class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
        <option>Selecione uma categoria</option>
        <option>Vinheta</option>
        <option>Anúncio</option>
        <option>Promoção</option>
      </select>
    </div>
    
    <!-- Checkbox -->
    <div class="flex items-center space-x-2">
      <input type="checkbox" class="w-4 h-4 text-primary bg-background border border-input rounded focus:ring-2 focus:ring-ring" />
      <label class="text-sm text-foreground">Item ativo</label>
    </div>
    
    <!-- Buttons -->
    <div class="flex space-x-3 pt-4">
      <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
        Salvar
      </button>
      <button type="button" class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
        Cancelar
      </button>
    </div>
  </form>
</div>`
    },
    {
      id: "theme",
      title: "Sistema de Tema Claro/Escuro",
      description: "Toggle para alternar entre modo claro e escuro",
      css: `:root {
  --background: 0 0% 6%;
  --foreground: 0 0% 96%;
  --card: 0 0% 9%;
  --card-foreground: 0 0% 96%;
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 0%;
  --secondary: 0 0% 14%;
  --secondary-foreground: 0 0% 96%;
  --muted: 0 0% 14%;
  --muted-foreground: 0 0% 64%;
  --accent: 271 81% 56%;
  --accent-foreground: 0 0% 96%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 96%;
  --border: 0 0% 14%;
  --input: 0 0% 14%;
  --ring: 142 76% 36%;
}

.light {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 142 76% 36%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 271 81% 56%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 142 76% 36%;
}`,
      js: `// Toggle de tema
const [isDarkMode, setIsDarkMode] = useState(true);

const toggleTheme = () => {
  const newMode = !isDarkMode;
  setIsDarkMode(newMode);
  
  if (newMode) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
};

// Botão de toggle
<button onClick={toggleTheme} class="p-2 text-muted-foreground hover:text-foreground rounded-md">
  {isDarkMode ? (
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z"/>
    </svg>
  ) : (
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
    </svg>
  )}
</button>`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pb-24">
      <Header selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      
      
      <div className="container mx-auto p-4 lg:p-6 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Documentação para Desenvolvedores</h1>
          <p className="text-muted-foreground">
            Encontre aqui todos os blocos de código HTML, CSS e JavaScript utilizados no layout da aplicação.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Componentes</p>
                  <p className="text-2xl font-bold text-foreground">{codeBlocks.length}</p>
                </div>
                <Badge variant="secondary">{codeBlocks.length} blocos</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tecnologias</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Badge variant="secondary">HTML/CSS/JS</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Framework</p>
                  <p className="text-2xl font-bold text-foreground">Tailwind</p>
                </div>
                <Badge variant="secondary">CSS Framework</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Blocks */}
        <div className="space-y-6">
          {codeBlocks.map((block) => (
            <Card key={block.id} className="border-border/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">{block.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
                  </div>
                  <Badge variant="outline">{block.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* HTML Code */}
                {block.html && (
                  <Collapsible 
                    open={openSections.has(`${block.id}-html`)}
                    onOpenChange={() => toggleSection(`${block.id}-html`)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <div className="flex items-center space-x-2">
                          {openSections.has(`${block.id}-html`) ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                          <span className="font-medium">HTML</span>
                          <Badge variant="secondary" className="text-xs">html</Badge>
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code className="text-muted-foreground">{block.html}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(block.html, `${block.id}-html`)}
                        >
                          {copiedId === `${block.id}-html` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* CSS Code */}
                {block.css && (
                  <Collapsible 
                    open={openSections.has(`${block.id}-css`)}
                    onOpenChange={() => toggleSection(`${block.id}-css`)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <div className="flex items-center space-x-2">
                          {openSections.has(`${block.id}-css`) ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                          <span className="font-medium">CSS</span>
                          <Badge variant="secondary" className="text-xs">css</Badge>
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code className="text-muted-foreground">{block.css}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(block.css, `${block.id}-css`)}
                        >
                          {copiedId === `${block.id}-css` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* JavaScript Code */}
                {block.js && (
                  <Collapsible 
                    open={openSections.has(`${block.id}-js`)}
                    onOpenChange={() => toggleSection(`${block.id}-js`)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <div className="flex items-center space-x-2">
                          {openSections.has(`${block.id}-js`) ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                          <span className="font-medium">JavaScript</span>
                          <Badge variant="secondary" className="text-xs">js</Badge>
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code className="text-muted-foreground">{block.js}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(block.js, `${block.id}-js`)}
                        >
                          {copiedId === `${block.id}-js` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Developers;
