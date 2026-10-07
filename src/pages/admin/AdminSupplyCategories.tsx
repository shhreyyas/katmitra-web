import { useState } from "react";
import { useDebouncedValue, useUrlParam } from "@/hooks/useUrlState";
import { AdminTableSkeleton } from "@/components/admin/AdminStates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RowActions from "@/components/admin/RowActions";
import { useAdminPagedList } from "@/hooks/useAdminPagedList";
import AdminPager from "@/components/admin/AdminPager";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  createSupplyCategory,
  deleteSupplyCategory,
  fetchSupplyCategoriesPage,
  type LocalizedNameInput,
  type SupplyCategoryRow,
  updateSupplyCategory,
} from "@/services/adminService";
import { AdminApiError } from "@/lib/adminApi";

type FormState = {
  en: string;
  hi: string;
  gu: string;
  slug: string;
  sort_order: string;
  is_active: boolean;
};

const emptyForm = (): FormState => ({
  en: "",
  hi: "",
  gu: "",
  slug: "",
  sort_order: "0",
  is_active: true,
});

const rowToForm = (row: SupplyCategoryRow): FormState => ({
  en: row.name_i18n?.en ?? row.name ?? "",
  hi: row.name_i18n?.hi ?? "",
  gu: row.name_i18n?.gu ?? "",
  slug: row.slug,
  sort_order: String(row.sort_order),
  is_active: row.is_active,
});

const AdminSupplyCategories = () => {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useUrlParam<"all" | "active" | "inactive">("status", "all");
  const [searchInput, setSearch] = useUrlParam("q", "");
  const search = useDebouncedValue(searchInput);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SupplyCategoryRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const {
    rows: filtered,
    pagination,
    setPage,
    isLoading,
    isPlaceholderData,
    isError,
    error,
  } = useAdminPagedList(["admin", "supply-categories", statusFilter, search.trim()], (page) =>
    fetchSupplyCategoriesPage({ status: statusFilter, q: search.trim() || undefined, page }),
  );

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
      const payload = {
        name,
        slug: form.slug.trim() || undefined,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      };
      if (editing) {
        return updateSupplyCategory(editing.id, payload);
      }
      return createSupplyCategory(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Category updated" : "Category created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      qc.invalidateQueries({ queryKey: ["admin", "supply-categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSupplyCategory(id),
    onSuccess: () => {
      toast.success("Category deleted");
      qc.invalidateQueries({ queryKey: ["admin", "supply-categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: SupplyCategoryRow) => {
    setEditing(row);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Supply Categories</h1>
          <p className="text-sm text-muted-foreground">
            Global supply catalog categories — used for ingredients and utensils.
          </p>
        </div>
        <Button onClick={openCreate}>Add category</Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Categories</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-56"
              placeholder="Search…"
              value={searchInput}
              onChange={(e) => setSearch(e.target.value)}
            />
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
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AdminTableSkeleton columns={6} />
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load categories"}
            </p>
          ) : (
            <Table
              className={isPlaceholderData ? "opacity-50 transition-opacity" : "transition-opacity"}
              aria-busy={isPlaceholderData}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : null}
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {[row.name_i18n?.hi, row.name_i18n?.gu].filter(Boolean).join(" · ")}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{row.slug}</TableCell>
                    <TableCell>{row.sort_order}</TableCell>
                    <TableCell>{row.supply_items_count}</TableCell>
                    <TableCell>
                      <Badge variant={row.is_active ? "default" : "secondary"}>
                        {row.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <RowActions
                          name={row.name}
                          actions={[
                            { label: "Edit", onSelect: () => openEdit(row) },
                            {
                              label: "Delete",
                              destructive: true,
                              disabled: row.supply_items_count > 0,
                              disabledReason: "Still in use",
                              confirm: { title: `Delete "${row.name}"?` },
                              onSelect: () => deleteMutation.mutate(row.id),
                            },
                          ]}
                        />
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <AdminPager pagination={pagination} onPageChange={setPage} noun="categories" />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit category" : "Add category"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
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
              <Label>Slug</Label>
              <Input
                value={form.slug}
                placeholder="auto from English if empty"
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
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

export default AdminSupplyCategories;
