import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
};

const AdminPlaceholderPage = ({ title, description }: Props) => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-gradient-gold">{title}</h1>
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  </div>
);

export default AdminPlaceholderPage;
