
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const VinhettasManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Anúncios</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie seus anúncios e vinhetas</p>
      </CardContent>
    </Card>
  );
};
