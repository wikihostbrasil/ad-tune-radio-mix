
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ScheduleManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Agendar</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Agende conteúdos para transmissão</p>
      </CardContent>
    </Card>
  );
};
