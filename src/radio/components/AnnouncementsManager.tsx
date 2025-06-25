
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AnnouncementsManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Avisos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie avisos e comunicados</p>
      </CardContent>
    </Card>
  );
};
