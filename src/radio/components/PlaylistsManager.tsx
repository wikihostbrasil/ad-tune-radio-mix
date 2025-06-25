
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlaylistsManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Playlists Musicais</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie suas playlists por dia da semana (2 selecionadas em Padrão)</p>
      </CardContent>
    </Card>
  );
};
