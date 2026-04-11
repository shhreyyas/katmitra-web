import { useMemo, useState } from "react";
import { users } from "@/data/adminMock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminUsers = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      users.filter((u) =>
        `${u.businessName} ${u.ownerName} ${u.phone} ${u.email}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gradient-gold">Users</h1>
      <Input placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Owner Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.businessName}</TableCell>
                  <TableCell>{u.ownerName}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.planType}</TableCell>
                  <TableCell>{u.expiryDate}</TableCell>
                  <TableCell>{u.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
