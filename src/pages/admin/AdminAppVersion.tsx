import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  fetchAppVersionConfig,
  updateAppVersionConfig,
  type AppVersionPlatformConfig,
} from "@/services/adminService";

type PlatformForm = {
  latest_version: string;
  minimum_version: string;
  update_message: string;
};

const emptyForm = (): PlatformForm => ({
  latest_version: "1.0.0",
  minimum_version: "1.0.0",
  update_message: "",
});

function compareVersions(a: string, b: string) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const va = pa[i] || 0;
    const vb = pb[i] || 0;
    if (va < vb) return -1;
    if (va > vb) return 1;
  }
  return 0;
}

function previewBadges(minimum: string, latest: string, sample = "1.0.0") {
  const force = compareVersions(sample, minimum) < 0;
  const optional = !force && compareVersions(sample, latest) < 0;
  if (force) return { label: "Force update", variant: "destructive" as const };
  if (optional) return { label: "Optional update", variant: "secondary" as const };
  return { label: "Up to date", variant: "outline" as const };
}

const PlatformCard = ({
  title,
  form,
  onChange,
}: {
  title: string;
  form: PlatformForm;
  onChange: (next: PlatformForm) => void;
}) => {
  const preview = previewBadges(form.minimum_version, form.latest_version);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          {title}
          <Badge variant={preview.variant}>{preview.label}</Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Preview for app v1.0.0 — force if below minimum, optional if below latest.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label>Latest version</Label>
          <Input
            placeholder="1.2.0"
            value={form.latest_version}
            onChange={(e) => onChange({ ...form, latest_version: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Minimum version (force update below)</Label>
          <Input
            placeholder="1.0.0"
            value={form.minimum_version}
            onChange={(e) => onChange({ ...form, minimum_version: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Update message</Label>
          <Textarea
            rows={3}
            value={form.update_message}
            onChange={(e) => onChange({ ...form, update_message: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const toForm = (row?: AppVersionPlatformConfig): PlatformForm =>
  row
    ? {
        latest_version: row.latest_version,
        minimum_version: row.minimum_version,
        update_message: row.update_message,
      }
    : emptyForm();

const AdminAppVersion = () => {
  const qc = useQueryClient();
  const [ios, setIos] = useState<PlatformForm>(emptyForm());
  const [android, setAndroid] = useState<PlatformForm>(emptyForm());

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "app-version"],
    queryFn: fetchAppVersionConfig,
  });

  useEffect(() => {
    if (data) {
      setIos(toForm(data.ios));
      setAndroid(toForm(data.android));
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () =>
      updateAppVersionConfig({
        ios,
        android,
      }),
    onSuccess: () => {
      toast.success("App version settings saved");
      qc.invalidateQueries({ queryKey: ["admin", "app-version"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">App Version</h1>
          <p className="text-sm text-muted-foreground">
            Control force and optional updates for iOS and Android via{" "}
            <code className="text-xs">GET /v1/app-latest-version</code>.
          </p>
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Failed to load app version config"}
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <PlatformCard title="iOS" form={ios} onChange={setIos} />
          <PlatformCard title="Android" form={android} onChange={setAndroid} />
        </div>
      )}
    </div>
  );
};

export default AdminAppVersion;
