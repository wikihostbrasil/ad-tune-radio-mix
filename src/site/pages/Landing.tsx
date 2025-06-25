
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioIcon, Play, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <RadioIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">RadioMix Platform</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="#recursos" className="text-muted-foreground hover:text-foreground">
              Recursos
            </Link>
            <Link to="#precos" className="text-muted-foreground hover:text-foreground">
              Preços
            </Link>
            <Link to="/player/login" className="text-blue-500 hover:text-blue-600">
              Player
            </Link>
            <Link to="/painel/login" className="text-green-500 hover:text-green-600">
              Painel Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Sua Rádio Online Completa
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma completa para gerenciar, transmitir e monetizar sua rádio online. 
            Tudo o que você precisa em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Link to="/player/criar-conta" className="flex items-center">
                Começar Gratuitamente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link to="/stream" className="flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Ouvir Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas profissionais para levar sua rádio ao próximo nível
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border/40 hover:border-blue-500/50 transition-colors">
            <CardHeader>
              <RadioIcon className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Player Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interface moderna para DJs com controles avançados, playlists e automação.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:border-green-500/50 transition-colors">
            <CardHeader>
              <Users className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Painel Administrativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gerencie múltiplas rádios, usuários, conteúdo e estatísticas em um painel completo.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:border-purple-500/50 transition-colors">
            <CardHeader>
              <Globe className="w-8 h-8 text-purple-500 mb-2" />
              <CardTitle>Transmissão Global</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transmita para o mundo todo com nossa infraestrutura de streaming confiável.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:border-orange-500/50 transition-colors">
            <CardHeader>
              <Zap className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle>Automação Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vinhetas, anúncios e programação automática com IA para otimizar sua programação.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:border-red-500/50 transition-colors">
            <CardHeader>
              <Play className="w-8 h-8 text-red-500 mb-2" />
              <CardTitle>Player Público</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interface limpa para seus ouvintes com player integrado e informações da programação.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/40 hover:border-blue-500/50 transition-colors">
            <CardHeader>
              <RadioIcon className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Monetização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ferramentas para monetizar sua rádio com anúncios, patrocínios e assinaturas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie sua conta gratuita e comece a transmitir em minutos. 
            Sem compromisso, sem taxas de configuração.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
              <Link to="/player/criar-conta">
                Criar Conta Gratuita
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link to="/stream">
                Ouvir Demonstração
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <RadioIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">RadioMix Platform</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 RadioMix Platform. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
