import { useMemo, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  createMenuItem,
  createSupplyItem,
  deleteMenuItem,
  fetchBusinesses,
  fetchMenuCategories,
  fetchMenuItems,
  fetchSupplyCategories,
  fetchSupplyItems,
  type LocalizedNameInput,
  type MenuItemIngredient,
  type MenuItemRow,
  type SupplyCategoryRow,
  type SupplyItemRow,
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

const ALL_UNITS = ["kg", "g", "mg", "L", "ml", "pcs", "dozen", "tbsp", "tsp", "cup"] as const;
type Unit = (typeof ALL_UNITS)[number];
const FALLBACK_UNITS: Unit[] = [...ALL_UNITS];

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

// Bulk comma-search: type multiple names, Search, add found + create missing
function SupplyItemPicker({
  items,
  alreadyAdded,
  supplyCategories,
  onAdd,
  onItemCreated,
}: {
  items: SupplyItemRow[];
  alreadyAdded: Set<string>;
  supplyCategories: SupplyCategoryRow[];
  onAdd: (selected: SupplyItemRow[]) => void;
  onItemCreated: () => void;
}) {
  type FoundResult = { item: SupplyItemRow; checked: boolean };
  type CreateForm = { term: string; en: string; hi: string; gu: string; category: string; units: Set<Unit> };

  const [bulkInput, setBulkInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [foundResults, setFoundResults] = useState<FoundResult[]>([]);
  const [createForms, setCreateForms] = useState<CreateForm[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = () => {
    const terms = bulkInput.split(",").map((s) => s.trim()).filter(Boolean);
    if (!terms.length) return;

    const usedIds = new Set<string>();
    const found: FoundResult[] = [];
    const notFoundTerms: string[] = [];

    for (const term of terms) {
      const q = term.toLowerCase();
      const match =
        items.find((i) => !usedIds.has(i.id) && i.name.toLowerCase() === q) ??
        items.find((i) => !usedIds.has(i.id) && i.name.toLowerCase().includes(q)) ??
        items.find((i) => !usedIds.has(i.id) && q.includes(i.name.toLowerCase()));

      if (match) {
        usedIds.add(match.id);
        found.push({ item: match, checked: !alreadyAdded.has(match.id) });
      } else {
        notFoundTerms.push(term);
      }
    }

    setFoundResults(found);
    setCreateForms(
      notFoundTerms.map((term) => ({ term, en: term, hi: "", gu: "", category: "", units: new Set() })),
    );
    setSearched(true);
  };

  const updateCreateForm = (idx: number, patch: Partial<Omit<CreateForm, "units">>) =>
    setCreateForms((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)));

  const toggleCreateUnit = (idx: number, unit: Unit) =>
    setCreateForms((prev) =>
      prev.map((f, i) => {
        if (i !== idx) return f;
        const next = new Set(f.units);
        if (next.has(unit)) next.delete(unit);
        else next.add(unit);
        return { ...f, units: next };
      }),
    );

  const buildAddLabel = () => {
    const nFound = foundResults.filter((f) => f.checked).length;
    const nCreate = createForms.filter(
      (f) => f.en && f.hi && f.gu && f.category && f.units.size,
    ).length;
    if (nFound && nCreate) return `Add ${nFound} + Create ${nCreate}`;
    if (nFound) return `Add ${nFound} found`;
    if (nCreate) return `Create ${nCreate} new`;
    return "Add";
  };

  const handleAddAll = async () => {
    setSubmitting(true);
    try {
      const toAdd = foundResults.filter((f) => f.checked).map((f) => f.item);
      if (toAdd.length) onAdd(toAdd);

      const created: SupplyItemRow[] = [];
      for (const form of createForms) {
        const unitList = ALL_UNITS.filter((u) => form.units.has(u));
        if (!form.en.trim() || !form.hi.trim() || !form.gu.trim() || !form.category || !unitList.length)
          continue;
        try {
          const newItem = await createSupplyItem({
            scope: "global",
            type: "INGREDIENT",
            name: { en: form.en.trim(), hi: form.hi.trim(), gu: form.gu.trim() },
            category_slug: form.category,
            unit_options: unitList,
            default_unit: unitList[0],
          });
          created.push(newItem);
        } catch (e) {
          toast.error(`Failed to create "${form.en}": ${(e as Error).message}`);
        }
      }
      if (created.length) {
        onAdd(created);
        onItemCreated();
      }

      const total = toAdd.length + created.length;
      if (total) toast.success(`${total} ingredient(s) added`);

      setBulkInput("");
      setFoundResults([]);
      setCreateForms([]);
      setSearched(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setBulkInput("");
    setFoundResults([]);
    setCreateForms([]);
    setSearched(false);
  };

  const addDisabled =
    submitting ||
    (foundResults.every((f) => !f.checked) && createForms.length === 0);

  return (
    <div className="space-y-3">
      {/* Bulk input row */}
      <div className="flex gap-2">
        <Input
          placeholder="Flour, Salt, Saffron… (comma-separated)"
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Results — only shown after a search */}
      {searched && (
        <div className="space-y-3">
          {/* Found items */}
          {foundResults.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Found ({foundResults.length})
              </p>
              {foundResults.map((r, idx) => (
                <div
                  key={r.item.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 cursor-pointer select-none"
                  onClick={() =>
                    setFoundResults((prev) =>
                      prev.map((f, i) => (i === idx ? { ...f, checked: !f.checked } : f)),
                    )
                  }
                >
                  <Checkbox
                    checked={r.checked}
                    onCheckedChange={(v) =>
                      setFoundResults((prev) =>
                        prev.map((f, i) => (i === idx ? { ...f, checked: !!v } : f)),
                      )
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="flex-1 text-sm">{r.item.name}</span>
                  {alreadyAdded.has(r.item.id) && (
                    <span className="text-xs text-muted-foreground">already added</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Not-found create forms */}
          {createForms.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                Not found — add to catalog ({createForms.length})
              </p>
              {createForms.map((form, idx) => (
                <div key={idx} className="rounded-md border p-3 space-y-2">
                  <p className="text-sm font-medium">&ldquo;{form.term}&rdquo;</p>
                  <Input
                    placeholder="English"
                    value={form.en}
                    onChange={(e) => updateCreateForm(idx, { en: e.target.value })}
                  />
                  <Input
                    placeholder="Hindi"
                    value={form.hi}
                    onChange={(e) => updateCreateForm(idx, { hi: e.target.value })}
                  />
                  <Input
                    placeholder="Gujarati"
                    value={form.gu}
                    onChange={(e) => updateCreateForm(idx, { gu: e.target.value })}
                  />
                  <Select
                    value={form.category || "__none__"}
                    onValueChange={(v) =>
                      updateCreateForm(idx, { category: v === "__none__" ? "" : v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {supplyCategories.map((c) => (
                        <SelectItem key={c.id} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Units (first = default)</p>
                    <div className="flex flex-wrap gap-2">
                      {ALL_UNITS.map((u) => (
                        <label
                          key={u}
                          className="flex items-center gap-1.5 cursor-pointer select-none"
                        >
                          <Checkbox
                            checked={form.units.has(u)}
                            onCheckedChange={() => toggleCreateUnit(idx, u)}
                          />
                          <span className="text-sm">{u}</span>
                        </label>
                      ))}
                    </div>
                    {form.units.size > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Default: <strong>{ALL_UNITS.find((u) => form.units.has(u))}</strong>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="outline" onClick={handleClear}>
              ← Clear
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={addDisabled}
              onClick={() => void handleAddAll()}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Working…
                </>
              ) : (
                buildAddLabel()
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Ingredient list with inline qty / unit editing
function IngredientList({
  ingredients,
  supplyIngredients,
  onUpdate,
  onRemove,
}: {
  ingredients: MenuItemIngredient[];
  supplyIngredients: SupplyItemRow[];
  onUpdate: (index: number, patch: Partial<MenuItemIngredient>) => void;
  onRemove: (index: number) => void;
}) {
  if (ingredients.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-1">
        No ingredients added yet.
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {ingredients.map((ing, i) => {
        const supply = supplyIngredients.find((s) => s.id === ing.supply_item_id);
        const unitOptions = supply?.unit_options?.length
          ? supply.unit_options
          : FALLBACK_UNITS;

        return (
          <div
            key={i}
            className="flex flex-wrap items-center gap-2 rounded-md bg-muted/40 px-3 py-1.5 text-sm"
          >
            <span className="flex-1 min-w-0 font-medium truncate">{ing.name}</span>
            {!ing.supply_item_id && (
              <Badge variant="outline" className="text-xs text-yellow-600 shrink-0">
                no supply link
              </Badge>
            )}
            <Input
              type="number"
              min={0}
              step="any"
              className="w-20 h-7 text-sm"
              placeholder="Qty"
              value={ing.qty ?? ""}
              onChange={(e) => onUpdate(i, { qty: e.target.value })}
            />
            <Select
              value={ing.unit || unitOptions[0] || ""}
              onValueChange={(v) => onUpdate(i, { unit: v })}
            >
              <SelectTrigger className="w-20 h-7 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => onRemove(i)}
            >
              ×
            </Button>
          </div>
        );
      })}
    </div>
  );
}

const AdminMenuItems = () => {
  const qc = useQueryClient();
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>("all");
  const [businessFilter, setBusinessFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [foodFilter, setFoodFilter] = useState("");
  const [search, setSearch] = useState("");

  // Full edit / create dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItemRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  // Dedicated ingredient editor dialog (per table row)
  const [ingDialogOpen, setIngDialogOpen] = useState(false);
  const [ingTarget, setIngTarget] = useState<MenuItemRow | null>(null);
  const [ingList, setIngList] = useState<MenuItemIngredient[]>([]);
  const [ingDialogSaving, setIngDialogSaving] = useState(false);

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

  // Load INGREDIENT supply items when either dialog is open
  const { data: supplyIngredients = [] } = useQuery({
    queryKey: ["admin", "supply-items", "INGREDIENT"],
    queryFn: () => fetchSupplyItems({ type: "INGREDIENT" }),
    enabled: dialogOpen || ingDialogOpen,
  });

  // Load supply categories for the inline create form
  const { data: supplyCategories = [] } = useQuery({
    queryKey: ["admin", "supply-categories", "active"],
    queryFn: () => fetchSupplyCategories("active"),
    enabled: dialogOpen || ingDialogOpen,
  });

  const onSupplyItemCreated = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "supply-items", "INGREDIENT"] });
  };

  // ─── Full edit/create dialog handlers ───────────────────────────────────────

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
      void qc.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      toast.success("Menu item deleted");
      void qc.invalidateQueries({ queryKey: ["admin", "menu-items"] });
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

  const addToDlgIngredients = (selected: SupplyItemRow[]) => {
    const existingIds = new Set(
      form.ingredients.map((i) => i.supply_item_id).filter(Boolean),
    );
    const toAdd = selected
      .filter((s) => !existingIds.has(s.id))
      .map((s) => ({
        supply_item_id: s.id,
        name: s.name,
        qty: "",
        unit: s.default_unit || s.unit_options?.[0] || "",
      }));
    setForm((f) => ({ ...f, ingredients: [...f.ingredients, ...toAdd] }));
  };

  const updateDlgIngredient = (index: number, patch: Partial<MenuItemIngredient>) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((ing, i) =>
        i === index ? { ...ing, ...patch } : ing,
      ),
    }));
  };

  const removeDlgIngredient = (index: number) => {
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== index),
    }));
  };

  // ─── Dedicated ingredient editor dialog handlers ────────────────────────────

  const openIngDialog = (row: MenuItemRow) => {
    setIngTarget(row);
    setIngList(row.ingredients?.length ? [...row.ingredients] : []);
    setIngDialogOpen(true);
  };

  const addToIngList = (selected: SupplyItemRow[]) => {
    const existingIds = new Set(
      ingList.map((i) => i.supply_item_id).filter(Boolean),
    );
    const toAdd = selected
      .filter((s) => !existingIds.has(s.id))
      .map((s) => ({
        supply_item_id: s.id,
        name: s.name,
        qty: "",
        unit: s.default_unit || s.unit_options?.[0] || "",
      }));
    setIngList((prev) => [...prev, ...toAdd]);
  };

  const updateIngListItem = (index: number, patch: Partial<MenuItemIngredient>) => {
    setIngList((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, ...patch } : ing)),
    );
  };

  const removeIngListItem = (index: number) => {
    setIngList((prev) => prev.filter((_, i) => i !== index));
  };

  const saveIngredients = async () => {
    if (!ingTarget) return;
    setIngDialogSaving(true);
    try {
      await updateMenuItem(ingTarget.id, { ingredients: ingList });
      toast.success("Ingredients saved");
      void qc.invalidateQueries({ queryKey: ["admin", "menu-items"] });
      setIngDialogOpen(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIngDialogSaving(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

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
                          {[row.name_i18n?.hi, row.name_i18n?.gu]
                            .filter(Boolean)
                            .join(" · ")}
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openIngDialog(row)}
                        >
                          Ingredients
                          {row.ingredients?.length
                            ? ` (${row.ingredients.length})`
                            : ""}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(row)}
                        >
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

      {/* ── Full create / edit dialog ── */}
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
                    setForm((f) => ({
                      ...f,
                      business_id: v === "__none__" ? "" : v,
                    }))
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
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1">
              <Label>Image URL (optional)</Label>
              <Input
                value={form.image_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image_url: e.target.value }))
                }
              />
            </div>

            {/* Ingredient section */}
            <div className="space-y-2">
              <Label>Ingredients (optional)</Label>
              <SupplyItemPicker
                items={supplyIngredients}
                alreadyAdded={
                  new Set(
                    form.ingredients
                      .map((i) => i.supply_item_id)
                      .filter((id): id is string => Boolean(id)),
                  )
                }
                supplyCategories={supplyCategories}
                onAdd={addToDlgIngredients}
                onItemCreated={onSupplyItemCreated}
              />
              <IngredientList
                ingredients={form.ingredients}
                supplyIngredients={supplyIngredients}
                onUpdate={updateDlgIngredient}
                onRemove={removeDlgIngredient}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {editing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Dedicated ingredient editor dialog ── */}
      <Dialog open={ingDialogOpen} onOpenChange={setIngDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Ingredients —{" "}
              <span className="font-normal">{ingTarget?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <SupplyItemPicker
              items={supplyIngredients}
              alreadyAdded={
                new Set(
                  ingList
                    .map((i) => i.supply_item_id)
                    .filter((id): id is string => Boolean(id)),
                )
              }
              supplyCategories={supplyCategories}
              onAdd={addToIngList}
              onItemCreated={onSupplyItemCreated}
            />
            {ingList.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Added ingredients</p>
                <IngredientList
                  ingredients={ingList}
                  supplyIngredients={supplyIngredients}
                  onUpdate={updateIngListItem}
                  onRemove={removeIngListItem}
                />
              </div>
            )}
            {ingList.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No ingredients added yet. Use the list above to select supply items.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIngDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => void saveIngredients()}
              disabled={ingDialogSaving}
            >
              {ingDialogSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenuItems;
