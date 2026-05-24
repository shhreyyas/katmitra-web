import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminComingSoon = () => {
  const { pathname } = useLocation();
  const title = pathname.split("/").pop()?.replace(/-/g, " ") ?? "Module";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold capitalize text-gradient-gold">{title}</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          UI is designed in Stitch; API wiring for this module is next. Menu Categories is live
          now.
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminComingSoon;
