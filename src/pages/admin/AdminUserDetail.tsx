import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAdminUser,
  recordOfflinePayment,
  setUserSuspended,
  updateUserSubscription,
} from "@/services/adminService";

const AdminUserDetail = () => {
  const { userId } = useParams();
  const qc = useQueryClient();
  const [extendMonths, setExtendMonths] = useState("12");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentTxn, setPaymentTxn] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "user", userId],
    queryFn: () => fetchAdminUser(userId!),
    enabled: Boolean(userId),
  });

  const suspendMutation = useMutation({
    mutationFn: (suspend: boolean) => setUserSuspended(userId!, suspend),
    onSuccess: (_, suspend) => {
      toast.success(suspend ? "User suspended" : "User reactivated");
      qc.invalidateQueries({ queryKey: ["admin", "user", userId] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const extendMutation = useMutation({
    mutationFn: () =>
      updateUserSubscription(userId!, {
        months: Number(extendMonths) || 12,
        plan: "12M",
        status: "active",
      }),
    onSuccess: () => {
      toast.success("Subscription extended");
      qc.invalidateQueries({ queryKey: ["admin", "user", userId] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const paymentMutation = useMutation({
    mutationFn: () => {
      const amount = Number(paymentAmount);
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Enter a valid amount");
      }
      return recordOfflinePayment(userId!, {
        amount,
        method: "offline",
        transaction_id: paymentTxn.trim() || undefined,
        notes: paymentNotes.trim() || undefined,
      });
    },
    onSuccess: () => {
      toast.success("Payment recorded");
      setPaymentAmount("");
      setPaymentTxn("");
      setPaymentNotes("");
      qc.invalidateQueries({ queryKey: ["admin", "user", userId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!userId) return null;

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-destructive">
        {(error as Error)?.message || "User not found"}
      </p>
    );
  }

  const { user, business, plan_type, subscriptions, payments } = data;
  const isSuspended = user.status === "suspended";

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <Link to="/admin/users" className="hover:text-primary">
          Users
        </Link>
        <span> / </span>
        <span className="text-foreground">
          {business?.business_name ?? user.name}
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">
            {business?.business_name ?? user.name}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant={isSuspended ? "secondary" : "default"}>
              {isSuspended ? "Suspended" : "Active"}
            </Badge>
            <Badge variant="outline">{plan_type}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isSuspended ? "default" : "destructive"}
            size="sm"
            onClick={() => suspendMutation.mutate(!isSuspended)}
            disabled={suspendMutation.isPending}
          >
            {isSuspended ? "Reactivate" : "Suspend"}
          </Button>
          <div className="flex items-center gap-2">
            <Input
              className="w-16 h-9"
              type="number"
              min={1}
              value={extendMonths}
              onChange={(e) => setExtendMonths(e.target.value)}
            />
            <Button
              size="sm"
              onClick={() => extendMutation.mutate()}
              disabled={extendMutation.isPending}
            >
              Extend (months)
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Business info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Owner:</span>{" "}
              {business?.business_owner_name ?? user.name}
            </p>
            <p>
              <span className="text-muted-foreground">Phone:</span>{" "}
              {business?.contact_number ?? user.phone ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span> {user.email}
            </p>
            <p>
              <span className="text-muted-foreground">Address:</span>{" "}
              {business?.business_address ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">GST:</span>{" "}
              {business?.gst_number ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Experience:</span>{" "}
              {business?.years_of_experience != null
                ? `${business.years_of_experience} years`
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Plan:</span>{" "}
              {business?.subscription?.plan ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              {business?.subscription?.status ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Start:</span>{" "}
              {business?.subscription?.start
                ? new Date(business.subscription.start).toLocaleDateString()
                : "—"}
            </p>
            <p>
              <span className="text-muted-foreground">End:</span>{" "}
              {business?.subscription?.end
                ? new Date(business.subscription.end).toLocaleDateString()
                : "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Last device login:</span>{" "}
              {user.last_login_at
                ? new Date(user.last_login_at).toLocaleString()
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Record offline payment</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-1">
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                min={0}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label>Transaction ID</Label>
              <Input
                value={paymentTxn}
                onChange={(e) => setPaymentTxn(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label>Notes</Label>
              <Input
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
              />
            </div>
            <Button
              className="sm:col-span-3 w-fit"
              onClick={() => paymentMutation.mutate()}
              disabled={paymentMutation.isPending}
            >
              Save payment
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Subscription history</CardTitle>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No billing subscriptions</p>
            ) : (
              <ul className="text-sm space-y-2">
                {subscriptions.map((s) => (
                  <li key={s.id} className="border-b border-border/40 pb-2">
                    <span className="font-medium">{s.plan_code ?? s.status}</span>
                    <span className="text-muted-foreground ml-2">{s.status}</span>
                    <div className="text-xs text-muted-foreground">
                      {s.period_start
                        ? new Date(s.period_start).toLocaleDateString()
                        : "—"}{" "}
                      →{" "}
                      {s.period_end
                        ? new Date(s.period_end).toLocaleDateString()
                        : "—"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No payments recorded</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-xs">
                        {new Date(p.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{p.amount}</TableCell>
                      <TableCell>{p.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUserDetail;
