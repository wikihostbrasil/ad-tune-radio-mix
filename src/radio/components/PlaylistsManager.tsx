
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlaylistsManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Playlists</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie suas playlists de música</p>
      </CardContent>
    </Card>
  );
};
