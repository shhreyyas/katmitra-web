import { useState } from "react";
import { accessCodes } from "@/data/adminMock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminAccessCodes = () => {
  const [rows, setRows] = useState(accessCodes);
  const [planType, setPlanType] = useState("1M");
  const [count, setCount] = useState(1);

  const generateCode = () => String(Math.floor(100000 + Math.random() * 900000));

  const createCodes = () => {
    const next = Array.from({ length: count }).map(() => ({
      code: generateCode(),
      planType,
      status: "unused",
      assignedUser: "-",
      createdAt: new Date().toISOString().slice(0, 10),
    }));
    setRows((prev) => [...next, ...prev]);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gradient-gold">Access Codes</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Generate Access Codes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <select className="h-10 rounded-md border px-3 text-sm" value={planType} onChange={(e) => setPlanType(e.target.value)}>
            <option value="1M">1 Month</option>
            <option value="6M">6 Months</option>
            <option value="12M">12 Months</option>
          </select>
          <Input className="w-24" type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          <Button onClick={createCodes}>Generate</Button>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned User</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.code}>
                  <TableCell>{r.code}</TableCell>
                  <TableCell>{r.planType}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>{r.assignedUser}</TableCell>
                  <TableCell>{r.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccessCodes;
