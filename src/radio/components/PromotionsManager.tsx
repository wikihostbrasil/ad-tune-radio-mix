
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PromotionsManager = () => {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-foreground">Promoções</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Gerencie promoções e campanhas</p>
      </CardContent>
    </Card>
  );
};
