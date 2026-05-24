import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  createMenuItem,
  deleteMenuItem,
  fetchBusinesses,
  fetchMenuCategories,
  fetchMenuItems,
  type LocalizedNameInput,
  type MenuItemIngredient,
  type MenuItemRow,
  updateMenuItem,
} from "@/services/adminService";
import { AdminApiError } from "@/lib/adminApi";

type ScopeFilter = "all" | "global" | "business";

type FormState = {
  scope: "global" | "business";
  business_id: string;
  en: string;
  hi: string;
  gu: string;
  category_slug: string;
  price_per_person: string;
  food_type: "veg" | "non_veg";
  description: string;
  image_url: string;
  ingredients: MenuItemIngredient[];
};

const emptyForm = (): FormState => ({
  scope: "global",
  business_id: "",
  en: "",
  hi: "",
  gu: "",
  category_slug: "",
  price_per_person: "",
  food_type: "veg",
  description: "",
  image_url: "",
  ingredients: [],
});

const rowToForm = (row: MenuItemRow): FormState => ({
  scope: row.is_global ? "global" : "business",
  business_id: row.business_id ?? "",
  en: row.name_i18n?.en ?? row.name ?? "",
  hi: row.name_i18n?.hi ?? "",
  gu: row.name_i18n?.gu ?? "",
  category_slug: row.category_slug,
  price_per_person: String(row.price_per_person),
  food_type: row.food_type,
  description: row.description ?? "",
  image_url: row.image_url ?? "",
  ingredients: row.ingredients?.length ? [...row.ingredients] : [],
});

const AdminMenuItems = () => {
  const qc = useQueryClient();
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [businessFilter, setBusinessFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [foodFilter, setFoodFilter] = useState("");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItemRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "menu-categories", "active"],
    queryFn: () => fetchMenuCategories("active"),
  });

  const { data: businesses = [] } = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: () => fetchBusinesses(),
  });

  const listQuery = useQuery({
    queryKey: [
      "admin",
      "menu-items",
      scopeFilter,
      businessFilter,
      categoryFilter,
      foodFilter,
      search,
    ],
    queryFn: () =>
      fetchMenuItems({
        scope: scopeFilter,
        business_id: scopeFilter === "business" ? businessFilter || undefined : undefined,
        category_slug: categoryFilter || undefined,
        food_type: foodFilter || undefined,
        q: search.trim() || undefined,
      }),
  });

  const items = listQuery.data ?? [];

  const filtered = useMemo(() => items, [items]);

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
      const price = Number(form.price_per_person);
      if (!Number.isFinite(price) || price < 0) {
        throw new AdminApiError("Valid price per person is required");
      }
      if (form.scope === "business" && !form.business_id) {
        throw new AdminApiError("Select a business for business-scoped items");
      }
      const payload = {
        scope: form.scope,
        business_id: form.scope === "business" ? form.business_id : undefined,
        name,
        price_per_person: price,
        category_slug: form.category_slug,
        food_type: form.food_type,
        ingredients: form.ingredients.filter((i) => i.name.trim()),
        image_url: form.image_url.trim() || undefined,
        description: form.description.trim() || undefined,
      };
      if (editing) {
        return updateMenuItem(editing.id, payload);
      }
      return createMenuItem(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Menu item updated" : "Menu item created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      qc.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      toast.success("Menu item deleted");
      qc.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: MenuItemRow) => {
    setEditing(row);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  const addIngredient = () => {
    setForm((f) => ({
      ...f,
      ingredients: [...f.ingredients, { name: "", qty: "", unit: "" }],
    }));
  };

  const updateIngredient = (index: number, patch: Partial<MenuItemIngredient>) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    }));
  };

  const removeIngredient = (index: number) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Menu Items</h1>
          <p className="text-sm text-muted-foreground">
            Global items are visible to all caterers. Business-only items are tied to one caterer.
          </p>
        </div>
        <Button onClick={openCreate}>Add menu item</Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Items</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-48"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={categoryFilter || "__all__"}
              onValueChange={(v) => setCategoryFilter(v === "__all__" ? "" : v)}
            >
              <SelectTrigger className="w-40">
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
              value={foodFilter || "__all__"}
              onValueChange={(v) => setFoodFilter(v === "__all__" ? "" : v)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Food type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All types</SelectItem>
                <SelectItem value="veg">Veg</SelectItem>
                <SelectItem value="non_veg">Non-veg</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectTrigger className="w-44">
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
              {(listQuery.error as Error)?.message || "Failed to load menu items"}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price / person</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No menu items found
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
                      <TableCell>₹{row.price_per_person}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {row.food_type === "veg" ? "Veg" : "Non-veg"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {row.is_global ? (
                          <Badge>Global</Badge>
                        ) : (
                          <Badge variant="secondary">
                            {row.business_name ?? "Business"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(row)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (window.confirm(`Delete "${row.name}"?`)) {
                              deleteMutation.mutate(row.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
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
            <DialogTitle>{editing ? "Edit menu item" : "Add menu item"}</DialogTitle>
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
                  <RadioGroupItem value="global" id="scope-global" />
                  <Label htmlFor="scope-global" className="font-normal">
                    Global (all caterers)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="business" id="scope-business" />
                  <Label htmlFor="scope-business" className="font-normal">
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
                  <SelectValue placeholder="Select category" />
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
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label>Price per person (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price_per_person}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price_per_person: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-1">
                <Label>Food type</Label>
                <Select
                  value={form.food_type}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, food_type: v as "veg" | "non_veg" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Veg</SelectItem>
                    <SelectItem value="non_veg">Non-veg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1">
              <Label>Description (optional)</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Image URL (optional)</Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ingredients (optional)</Label>
                <Button type="button" size="sm" variant="outline" onClick={addIngredient}>
                  Add row
                </Button>
              </div>
              {form.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <Input
                    className="flex-1"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) => updateIngredient(i, { name: e.target.value })}
                  />
                  <Input
                    className="w-20"
                    placeholder="Qty"
                    value={ing.qty ?? ""}
                    onChange={(e) => updateIngredient(i, { qty: e.target.value })}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeIngredient(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
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

export default AdminMenuItems;
