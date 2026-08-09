import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fetchAdminSettings, updateAdminSettings } from "@/services/adminService";

const AdminSettings = () => {
  const qc = useQueryClient();
  const [appName, setAppName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [paymentUpi, setPaymentUpi] = useState("");
  const [paymentBank, setPaymentBank] = useState("");
  const [serviceChargePct, setServiceChargePct] = useState("");
  const [taxPct, setTaxPct] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: fetchAdminSettings,
  });

  useEffect(() => {
    if (data) {
      setAppName(data.app_name);
      setSupportEmail(data.support_email);
      setPaymentUpi(data.payment_upi);
      setPaymentBank(data.payment_bank);
      setServiceChargePct(String(data.default_service_charge_pct));
      setTaxPct(String(data.default_tax_pct));
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () =>
      updateAdminSettings({
        app_name: appName.trim(),
        support_email: supportEmail.trim(),
        payment_upi: paymentUpi.trim(),
        payment_bank: paymentBank.trim(),
        default_service_charge_pct: Number(serviceChargePct),
        default_tax_pct: Number(taxPct),
      }),
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Global app branding, support contact, and offline payment details.
          </p>
        </div>
        <Button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending || !appName.trim()}
        >
          {saveMutation.isPending ? "Saving…" : "Save settings"}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Failed to load settings"}
        </p>
      ) : (
        <div className="grid gap-6 max-w-2xl">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="app-name">App name</Label>
                <Input
                  id="app-name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Katmitra"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-email">Support email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="support@katmitra.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Booking defaults</CardTitle>
              <p className="text-xs text-muted-foreground">
                Applied to new businesses at signup. Existing businesses are
                unaffected — owners can edit their own values in-app.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="default-service-charge-pct">
                    Service charge %
                  </Label>
                  <Input
                    id="default-service-charge-pct"
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={serviceChargePct}
                    onChange={(e) => setServiceChargePct(e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="default-tax-pct">Tax %</Label>
                  <Input
                    id="default-tax-pct"
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={taxPct}
                    onChange={(e) => setTaxPct(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Payment details</CardTitle>
              <p className="text-xs text-muted-foreground">
                Shown to caterers for offline / manual payments where applicable.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="payment-upi">UPI ID</Label>
                <Input
                  id="payment-upi"
                  value={paymentUpi}
                  onChange={(e) => setPaymentUpi(e.target.value)}
                  placeholder="business@upi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-bank">Bank details</Label>
                <Textarea
                  id="payment-bank"
                  rows={4}
                  value={paymentBank}
                  onChange={(e) => setPaymentBank(e.target.value)}
                  placeholder="Account name, number, IFSC…"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
