import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileSpreadsheet, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  downloadBulkImportTemplate,
  fetchBulkImportSchemas,
  runBulkImport,
  type BulkImportResult,
  type BulkImportSchema,
} from "@/services/adminService";
import { csvToObjects, parseCsv } from "@/lib/csvParse";
import {
  errorsToCsv,
  loadRecentImports,
  saveRecentImport,
  type BulkImportJob,
} from "@/lib/bulkImportRecent";

const IMPORT_TYPES = [
  "menu_items",
  "supply_items",
  "menu_categories",
  "supply_categories",
] as const;

type ImportType = (typeof IMPORT_TYPES)[number];

const VIEW_PATH: Record<ImportType, string> = {
  menu_items: "/admin/menu-items",
  supply_items: "/admin/supply-items",
  menu_categories: "/admin/menu-categories",
  supply_categories: "/admin/supply-categories",
};

const isImportType = (v: string): v is ImportType =>
  (IMPORT_TYPES as readonly string[]).includes(v);

const BulkImportHub = () => {
  const navigate = useNavigate();
  const [recent, setRecent] = useState<BulkImportJob[]>([]);

  const { data: schemas = [] } = useQuery({
    queryKey: ["admin", "bulk-import-schemas"],
    queryFn: fetchBulkImportSchemas,
  });

  useEffect(() => {
    setRecent(loadRecentImports());
  }, []);

  const schemaByType = useMemo(() => {
    const map = new Map<string, BulkImportSchema>();
    schemas.forEach((s) => map.set(s.type, s));
    return map;
  }, [schemas]);

  const cards: { type: ImportType; description: string }[] = [
    {
      type: "menu_items",
      description: "Dishes with EN / HI / Kutchi names, category, price, veg type.",
    },
    {
      type: "supply_items",
      description: "Ingredients and utensils with categories and units.",
    },
    {
      type: "menu_categories",
      description: "Global menu category catalog.",
    },
    {
      type: "supply_categories",
      description: "Global supply category catalog.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Bulk Import</h1>
        <p className="text-sm text-muted-foreground">
          Upload CSV to add catalog data at once. Excel (.xlsx) — save as CSV first.
        </p>
      </div>

      <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        Supported format: <Badge variant="secondary">CSV</Badge>{" "}
        <Badge variant="outline" className="ml-1 opacity-60">
          XLSX — export as CSV
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card
            key={card.type}
            className="glass-card hover:border-primary/40 transition-colors cursor-pointer"
            onClick={() => navigate(`/admin/bulk-import/${card.type}`)}
          >
            <CardHeader className="pb-2">
              <FileSpreadsheet className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base">
                {schemaByType.get(card.type)?.label ?? card.type}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">{card.description}</p>
              <Button
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/bulk-import/${card.type}`);
                }}
              >
                Start import
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {recent.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Recent imports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.label}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(job.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{job.total_rows}</TableCell>
                    <TableCell className="text-xs">
                      <span className="text-green-600">{job.imported} ok</span>
                      {job.skipped > 0 && (
                        <span className="text-amber-600 ml-2">{job.skipped} skipped</span>
                      )}
                      {job.failed > 0 && (
                        <span className="text-destructive ml-2">{job.failed} failed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.status === "completed" ? "default" : "destructive"}>
                        {job.status === "completed" ? "Completed" : "Failed"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

type WizardStep = "upload" | "map" | "results";

const BulkImportWizard = () => {
  const { importType: typeParam = "" } = useParams();
  const navigate = useNavigate();
  const importType = isImportType(typeParam) ? typeParam : null;

  const [step, setStep] = useState<WizardStep>("upload");
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [hasHeader, setHasHeader] = useState(true);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [result, setResult] = useState<BulkImportResult | null>(null);

  const { data: schemas = [] } = useQuery({
    queryKey: ["admin", "bulk-import-schemas"],
    queryFn: fetchBulkImportSchemas,
  });

  const schema = schemas.find((s) => s.type === importType);

  useEffect(() => {
    if (!importType) {
      navigate("/admin/bulk-import");
    }
  }, [importType, navigate]);

  useEffect(() => {
    if (!schema) return;
    const initial: Record<string, string> = {};
    schema.fields.forEach((f) => {
      const match = headers.find(
        (h) => h.toLowerCase().replace(/\s+/g, "_") === f.key.toLowerCase(),
      );
      if (match) initial[f.key] = match;
    });
    setMapping((prev) => ({ ...initial, ...prev }));
  }, [schema, headers]);

  const importMutation = useMutation({
    mutationFn: () => {
      if (!importType) throw new Error("Invalid type");
      return runBulkImport({
        type: importType,
        rows,
        mapping,
        options: { skip_duplicates: skipDuplicates },
      });
    },
    onSuccess: (data) => {
      setResult(data);
      setStep("results");
      if (schema && importType) {
        saveRecentImport({
          id: `${Date.now()}`,
          type: importType,
          label: schema.label,
          created_at: new Date().toISOString(),
          total_rows: data.total_rows,
          imported: data.imported,
          skipped: data.skipped,
          failed: data.failed,
          status: data.failed > 0 && data.imported === 0 ? "failed" : "completed",
        });
      }
      toast.success("Import finished");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onFile = async (file: File) => {
    const text = await file.text();
    const matrix = parseCsv(text);
    const parsed = csvToObjects(matrix, hasHeader);
    setHeaders(parsed.headers);
    setRows(parsed.rows);
    setFileName(file.name);
    if (parsed.rows.length === 0) {
      toast.error("No data rows found in file");
      return;
    }
    if (parsed.rows.length > 500) {
      toast.error("Maximum 500 rows per import");
      setRows(parsed.rows.slice(0, 500));
    }
    toast.success(`Loaded ${parsed.rows.length} rows`);
  };

  const downloadErrors = () => {
    if (!result?.errors?.length) return;
    const csv = errorsToCsv(result.errors);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${importType}-errors.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!importType || !schema) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  const steps: { id: WizardStep; label: string }[] = [
    { id: "upload", label: "Upload" },
    { id: "map", label: "Map columns" },
    { id: "results", label: "Results" },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link to="/admin/bulk-import" className="hover:text-primary">
          Bulk Import
        </Link>
        <span>/</span>
        <span className="text-foreground">{schema.label}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <Badge
            key={s.id}
            variant={step === s.id ? "default" : i < stepIndex ? "secondary" : "outline"}
          >
            {i + 1}. {s.label}
          </Badge>
        ))}
      </div>

      {step === "upload" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Upload file</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-muted-foreground/40 p-8 cursor-pointer hover:border-primary/50">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Drop CSV or click to browse
                </span>
                <Input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void onFile(f);
                  }}
                />
              </label>
              {fileName && (
                <p className="text-sm text-green-600">✓ {fileName} ({rows.length} rows)</p>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="has-header"
                  checked={hasHeader}
                  onCheckedChange={(v) => setHasHeader(v === true)}
                />
                <Label htmlFor="has-header">First row is header</Label>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => downloadBulkImportTemplate(importType)}
              >
                Download sample template
              </Button>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Required fields</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {schema.fields.map((f) => (
                  <li key={f.key}>
                    {f.label}
                    {f.required && <span className="text-destructive"> *</span>}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="lg:col-span-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/bulk-import")}>
              Cancel
            </Button>
            <Button disabled={!rows.length} onClick={() => setStep("map")}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "map" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Map columns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>System field</TableHead>
                  <TableHead>CSV column</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schema.fields.map((f) => (
                  <TableRow key={f.key}>
                    <TableCell>
                      {f.label}
                      {f.required && <span className="text-destructive"> *</span>}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={mapping[f.key] || "__none__"}
                        onValueChange={(v) =>
                          setMapping((m) => ({
                            ...m,
                            [f.key]: v === "__none__" ? "" : v,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">—</SelectItem>
                          {headers.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center gap-2">
              <Checkbox
                id="skip-dup"
                checked={skipDuplicates}
                onCheckedChange={(v) => setSkipDuplicates(v === true)}
              />
              <Label htmlFor="skip-dup">Skip duplicates (slug or name+category)</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Preview: first {Math.min(3, rows.length)} of {rows.length} rows will be imported.
            </p>
            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button
                onClick={() => importMutation.mutate()}
                disabled={importMutation.isPending}
              >
                {importMutation.isPending ? "Importing…" : "Run import"}
              </Button>
            </div>
            {importMutation.isPending && <Progress value={66} className="h-2" />}
          </CardContent>
        </Card>
      )}

      {step === "results" && result && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="glass-card border-green-500/30">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-green-600">{result.imported}</p>
                <p className="text-sm text-muted-foreground">Imported</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-amber-500/30">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-amber-600">{result.skipped}</p>
                <p className="text-sm text-muted-foreground">Skipped</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-destructive/30">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-destructive">{result.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
          </div>

          {result.errors.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">Failed rows</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.errors.slice(0, 50).map((err) => (
                      <TableRow key={`${err.row}-${err.message}`}>
                        <TableCell>{err.row}</TableCell>
                        <TableCell className="text-sm text-destructive">
                          {err.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-2">
            {result.errors.length > 0 && (
              <Button variant="outline" onClick={downloadErrors}>
                Download error CSV
              </Button>
            )}
            <Button variant="ghost" onClick={() => navigate("/admin/bulk-import")}>
              Import another
            </Button>
            <Button asChild>
              <Link to={VIEW_PATH[importType]}>View catalog</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminBulkImport = () => (
  <Routes>
    <Route index element={<BulkImportHub />} />
    <Route path=":importType" element={<BulkImportWizard />} />
  </Routes>
);

export default AdminBulkImport;
