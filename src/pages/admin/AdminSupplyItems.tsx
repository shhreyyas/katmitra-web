import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
  createSupplyItem,
  deleteSupplyItem,
  fetchBusinesses,
  fetchSupplyCategories,
  fetchSupplyItems,
  fetchUnits,
  type LocalizedNameInput,
  type SupplyItemRow,
  updateSupplyItem,
} from "@/services/adminService";
import { AdminApiError } from "@/lib/adminApi";

type ScopeFilter = "all" | "global" | "business";

type FormState = {
  scope: "global" | "business";
  business_id: string;
  en: string;
  hi: string;
  gu: string;
  type: "INGREDIENT" | "UTENSIL";
  category_slug: string;
  unit_options: string[];
  default_unit: string;
  available_count: string;
  damaged_count: string;
  photo_url: string;
  is_active: boolean;
};

const emptyForm = (): FormState => ({
  scope: "global",
  business_id: "",
  en: "",
  hi: "",
  gu: "",
  type: "INGREDIENT",
  category_slug: "",
  unit_options: [],
  default_unit: "",
  available_count: "",
  damaged_count: "0",
  photo_url: "",
  is_active: true,
});

const rowToForm = (row: SupplyItemRow): FormState => ({
  scope: row.is_global ? "global" : "business",
  business_id: row.business_id ?? "",
  en: row.name_i18n?.en ?? row.name ?? "",
  hi: row.name_i18n?.hi ?? "",
  gu: row.name_i18n?.gu ?? "",
  type: row.type,
  category_slug: row.category_slug,
  unit_options: [...(row.unit_options ?? [])],
  default_unit: row.default_unit,
  available_count:
    row.available_count != null ? String(row.available_count) : "",
  damaged_count: String(row.damaged_count ?? 0),
  photo_url: row.photo_url ?? "",
  is_active: row.is_active,
});

const AdminSupplyItems = () => {
  const qc = useQueryClient();
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("active");
  const [businessFilter, setBusinessFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SupplyItemRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "supply-categories", "active"],
    queryFn: () => fetchSupplyCategories("active"),
  });

  const { data: businesses = [] } = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: () => fetchBusinesses(),
  });

  const { data: units = [] } = useQuery({
    queryKey: ["admin", "units"],
    queryFn: () => fetchUnits(),
  });

  const listQuery = useQuery({
    queryKey: [
      "admin",
      "supply-items",
      scopeFilter,
      statusFilter,
      businessFilter,
      categoryFilter,
      typeFilter,
      search,
    ],
    queryFn: () =>
      fetchSupplyItems({
        scope: scopeFilter,
        status: statusFilter,
        business_id: scopeFilter === "business" ? businessFilter || undefined : undefined,
        category_slug: categoryFilter || undefined,
        type: typeFilter || undefined,
        q: search.trim() || undefined,
      }),
  });

  const items = listQuery.data ?? [];
  const filtered = useMemo(() => items, [items]);

  const toggleUnit = (slug: string, checked: boolean) => {
    setForm((f) => {
      const next = checked
        ? [...new Set([...f.unit_options, slug])]
        : f.unit_options.filter((u) => u !== slug);
      const default_unit =
        f.default_unit && next.includes(f.default_unit) ? f.default_unit : next[0] ?? "";
      return { ...f, unit_options: next, default_unit };
    });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const name: LocalizedNameInput = {
        en: form.en.trim(),
        hi: form.hi.trim(),
        gu: form.gu.trim(),
      };
      if (!name.en || !name.hi || !name.gu) {
        throw new AdminApiError("English, Hindi, and Gujarati names are required");
      }
      if (!form.category_slug) {
        throw new AdminApiError("Category is required");
      }
      if (form.unit_options.length === 0 || !form.default_unit) {
        throw new AdminApiError("Select at least one unit and a default unit");
      }
      if (form.scope === "business" && !form.business_id) {
        throw new AdminApiError("Select a business for business-scoped items");
      }

      const payload = {
        scope: form.scope,
        business_id: form.scope === "business" ? form.business_id : undefined,
        name,
        type: form.type,
        category_slug: form.category_slug,
        unit_options: form.unit_options,
        default_unit: form.default_unit,
        available_count:
          form.type === "UTENSIL" && form.available_count.trim() !== ""
            ? Number(form.available_count)
            : null,
        damaged_count:
          form.type === "UTENSIL" ? Number(form.damaged_count) || 0 : undefined,
        photo_url: form.photo_url.trim() || undefined,
        is_active: form.is_active,
      };

      if (editing) {
        return updateSupplyItem(editing.id, payload);
      }
      return createSupplyItem(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Supply item updated" : "Supply item created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      qc.invalidateQueries({ queryKey: ["admin", "supply-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSupplyItem(id),
    onSuccess: () => {
      toast.success("Supply item deactivated");
      qc.invalidateQueries({ queryKey: ["admin", "supply-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: SupplyItemRow) => {
    setEditing(row);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Supply Items</h1>
          <p className="text-sm text-muted-foreground">
            Ingredients and utensils — global by default, or business-only when needed.
          </p>
        </div>
        <Button onClick={openCreate}>Add supply item</Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Items</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-44"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={categoryFilter || "__all__"}
              onValueChange={(v) => setCategoryFilter(v === "__all__" ? "" : v)}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={typeFilter || "__all__"}
              onValueChange={(v) => setTypeFilter(v === "__all__" ? "" : v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All types</SelectItem>
                <SelectItem value="INGREDIENT">Ingredient</SelectItem>
                <SelectItem value="UTENSIL">Utensil</SelectItem>
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
              {(listQuery.error as Error)?.message || "Failed to load supply items"}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default unit</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No supply items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="font-medium">{row.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {[row.name_i18n?.hi, row.name_i18n?.gu].filter(Boolean).join(" · ")}
                        </div>
                      </TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {row.type === "INGREDIENT" ? "Ingredient" : "Utensil"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{row.default_unit}</TableCell>
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
                              if (window.confirm(`Deactivate "${row.name}"?`)) {
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
            <DialogTitle>{editing ? "Edit supply item" : "Add supply item"}</DialogTitle>
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
                  <RadioGroupItem value="global" id="supply-scope-global" />
                  <Label htmlFor="supply-scope-global" className="font-normal">
                    Global
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="business" id="supply-scope-business" />
                  <Label htmlFor="supply-scope-business" className="font-normal">
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
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, type: v as "INGREDIENT" | "UTENSIL" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INGREDIENT">Ingredient</SelectItem>
                    <SelectItem value="UTENSIL">Utensil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label>Category</Label>
                <Select
                  value={form.category_slug || "__none__"}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      category_slug: v === "__none__" ? "" : v,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.slug}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1">
              <Label>English name</Label>
              <Input
                value={form.en}
                onChange={(e) => setForm((f) => ({ ...f, en: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Hindi name</Label>
              <Input
                value={form.hi}
                onChange={(e) => setForm((f) => ({ ...f, hi: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Gujarati / Kutchi name</Label>
              <Input
                value={form.gu}
                onChange={(e) => setForm((f) => ({ ...f, gu: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Units</Label>
              {units.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No units in catalog yet — add units under Admin → Units first.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                  {units.map((u) => (
                    <label key={u.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={form.unit_options.includes(u.slug)}
                        onCheckedChange={(c) => toggleUnit(u.slug, c === true)}
                      />
                      {u.name} ({u.slug})
                    </label>
                  ))}
                </div>
              )}
            </div>
            {form.unit_options.length > 0 && (
              <div className="grid gap-1">
                <Label>Default unit</Label>
                <Select
                  value={form.default_unit}
                  onValueChange={(v) => setForm((f) => ({ ...f, default_unit: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {form.unit_options.map((slug) => (
                      <SelectItem key={slug} value={slug}>
                        {slug}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {form.type === "UTENSIL" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Available count</Label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Optional"
                    value={form.available_count}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, available_count: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-1">
                  <Label>Damaged count</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.damaged_count}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, damaged_count: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}
            <div className="grid gap-1">
              <Label>Photo URL (optional)</Label>
              <Input
                value={form.photo_url}
                onChange={(e) => setForm((f) => ({ ...f, photo_url: e.target.value }))}
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

export default AdminSupplyItems;
