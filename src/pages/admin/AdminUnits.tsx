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
import {
  createUnit,
  deleteUnit,
  fetchUnits,
  type UnitRow,
  updateUnit,
} from "@/services/adminService";
import { AdminApiError } from "@/lib/adminApi";

type FormState = {
  name: string;
  slug: string;
};

const emptyForm = (): FormState => ({ name: "", slug: "" });

const rowToForm = (row: UnitRow): FormState => ({
  name: row.name,
  slug: row.slug,
});

const AdminUnits = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<UnitRow | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data: units = [], isLoading, isError, error } = useQuery({
    queryKey: ["admin", "units", search],
    queryFn: () => fetchUnits(search.trim() || undefined),
  });

  const filtered = useMemo(() => units, [units]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const name = form.name.trim();
      if (!name) {
        throw new AdminApiError("Name is required");
      }
      const payload = {
        name,
        slug: form.slug.trim() || undefined,
      };
      if (editing) {
        return updateUnit(editing.id, payload);
      }
      return createUnit(payload);
    },
    onSuccess: () => {
      toast.success(editing ? "Unit updated" : "Unit created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      qc.invalidateQueries({ queryKey: ["admin", "units"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUnit(id),
    onSuccess: () => {
      toast.success("Unit deleted");
      qc.invalidateQueries({ queryKey: ["admin", "units"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (row: UnitRow) => {
    setEditing(row);
    setForm(rowToForm(row));
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Units</h1>
          <p className="text-sm text-muted-foreground">
            Global measurement units — used on supply items (kg, litre, pcs, etc.).
          </p>
        </div>
        <Button onClick={openCreate}>Add unit</Button>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Catalog</CardTitle>
          <Input
            className="w-56"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load units"}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No units found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="font-mono text-xs">{row.slug}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(row)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (window.confirm(`Delete unit "${row.name}"?`)) {
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit unit" : "Add unit"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid gap-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                placeholder="e.g. Kilogram"
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                placeholder="auto from name if empty"
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
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

export default AdminUnits;
