
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const VirtualVoiceManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Locução IA</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie locuções virtuais com IA</p>
      </CardContent>
    </Card>
  );
};
