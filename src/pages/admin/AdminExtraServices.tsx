import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createExtraService,
  deleteExtraService,
  fetchBusinesses,
  fetchExtraServices,
  type ExtraServiceRow,
  updateExtraService,
} from "@/services/adminService";
import { AdminApiError } from "@/lib/adminApi";

type ScopeFilter = "all" | "global" | "business";
type PricingFilter = "" | "FIXED" | "PER_UNIT" | "PER_GUEST";

type FormState = {
  scope: "global" | "business";
  business_id: string;
  title: string;
  description: string;
  pricing_type: "FIXED" | "PER_UNIT" | "PER_GUEST";
  price: string;
  is_optional: boolean;
  is_active: boolean;
};

const pricingLabel: Record<ExtraServiceRow["pricing_type"], string> = {
  FIXED: "Fixed",
  PER_UNIT: "Per unit",
  PER_GUEST: "Per guest",
};

const emptyForm = (): FormState => ({
  scope: "global",
  business_id: "",
  title: "",
  description: "",
  pricing_type: "FIXED",
  price: "",
  is_optional: true,
  is_active: true,
});

const rowToForm = (row: ExtraServiceRow): FormState => ({
  scope: row.is_global ? "global" : "business",
  business_id: row.business_id ?? "",
  title: row.title,
  description: row.description ?? "",
  pricing_type: row.pricing_type,
  price: String(row.price),
  is_optional: row.is_optional,
  is_active: row.is_active,
});

const AdminExtraServices = () => {
  const qc = useQueryClient();
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("active");
  const [businessFilter, setBusinessFilter] = useState("");
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>("");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ExtraServiceRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data: businesses = [] } = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: () => fetchBusinesses(),
  });

  const listQuery = useQuery({
    queryKey: [
      "admin",
      "extra-services",
      scopeFilter,
      statusFilter,
      businessFilter,
      pricingFilter,
      search,
    ],
    queryFn: () =>
      fetchExtraServices({
        scope: scopeFilter,
        status: statusFilter,
        business_id: scopeFilter === "business" ? businessFilter || undefined : undefined,
        pricing_type: pricingFilter || undefined,
        q: search.trim() || undefined,
      }),
  });

  const items = listQuery.data ?? [];
  const filtered = useMemo(() => items, [items]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const title = form.title.trim();
      if (!title) {
        throw new AdminApiError("Title is required");
      }
      const price = Number(form.price);
      if (!Number.isFinite(price) || price < 0) {
        throw new AdminApiError("Valid price is required");
      }
      if (form.scope === "business" && !form.business_id) {
        throw new AdminApiError("Select a business for business-scoped items");
      }
      const payload = {
        scope: form.scope,
        business_id: form.scope === "business" ? form.business_id : undefined,
        title,
        description: form.description.trim() || undefined,
        pricing_type: form.pricing_type,
        price,
        is_optional: form.is_optional,
        is_active: form.is_active,
      };
      if (editing) {
        return updateExtraService(editing.id, payload);
      }
      return createExtraService(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Extra service updated" : "Extra service created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      qc.invalidateQueries({ queryKey: ["admin", "extra-services"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteExtraService(id),
    onSuccess: () => {
      toast.success("Extra service deactivated");
      qc.invalidateQueries({ queryKey: ["admin", "extra-services"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: ExtraServiceRow) => {
    setEditing(row);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Extra Services</h1>
          <p className="text-sm text-muted-foreground">
            Optional add-ons for bookings — global templates or business-only.
          </p>
        </div>
        <Button onClick={openCreate}>Add extra service</Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Services</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-44"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={pricingFilter || "__all__"}
              onValueChange={(v) => setPricingFilter(v === "__all__" ? "" : (v as PricingFilter))}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All pricing</SelectItem>
                <SelectItem value="FIXED">Fixed</SelectItem>
                <SelectItem value="PER_GUEST">Per guest</SelectItem>
                <SelectItem value="PER_UNIT">Per unit</SelectItem>
              </SelectContent>
            </Select>
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs
              value={scopeFilter}
              onValueChange={(v) => setScopeFilter(v as ScopeFilter)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
            </Tabs>
            {scopeFilter === "business" && (
              <Select
                value={businessFilter || "__all__"}
                onValueChange={(v) => setBusinessFilter(v === "__all__" ? "" : v)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All businesses</SelectItem>
                  {businesses.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {listQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : listQuery.isError ? (
            <p className="text-sm text-destructive">
              {(listQuery.error as Error)?.message || "Failed to load extra services"}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Optional</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No extra services found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="font-medium">{row.title}</div>
                        {row.description && (
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {row.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{pricingLabel[row.pricing_type]}</Badge>
                      </TableCell>
                      <TableCell>₹{row.price}</TableCell>
                      <TableCell>{row.is_optional ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {row.is_global ? (
                          <Badge>Global</Badge>
                        ) : (
                          <Badge variant="secondary">
                            {row.business_name ?? "Business"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.is_active ? "default" : "secondary"}>
                          {row.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(row)}>
                          Edit
                        </Button>
                        {row.is_active && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (window.confirm(`Deactivate "${row.title}"?`)) {
                                deleteMutation.mutate(row.id);
                              }
                            }}
                          >
                            Deactivate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit extra service" : "Add extra service"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-2">
              <Label>Availability</Label>
              <RadioGroup
                value={form.scope}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, scope: v as "global" | "business" }))
                }
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="global" id="extra-scope-global" />
                  <Label htmlFor="extra-scope-global" className="font-normal">
                    Global
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="business" id="extra-scope-business" />
                  <Label htmlFor="extra-scope-business" className="font-normal">
                    Business only
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {form.scope === "business" && (
              <div className="grid gap-1">
                <Label>Business</Label>
                <Select
                  value={form.business_id || "__none__"}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, business_id: v === "__none__" ? "" : v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Description (optional)</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label>Pricing type</Label>
                <Select
                  value={form.pricing_type}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      pricing_type: v as FormState["pricing_type"],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed</SelectItem>
                    <SelectItem value="PER_GUEST">Per guest</SelectItem>
                    <SelectItem value="PER_UNIT">Per unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Optional add-on</Label>
              <Switch
                checked={form.is_optional}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_optional: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {editing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExtraServices;
