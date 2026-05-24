import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminNotifications, sendAdminNotification } from "@/services/adminService";

const AdminNotifications = () => {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "notifications", page],
    queryFn: () => fetchAdminNotifications({ page, limit: 20 }),
  });

  const sendMutation = useMutation({
    mutationFn: () => sendAdminNotification({ title: title.trim(), message: message.trim() }),
    onSuccess: (res) => {
      toast.success(res.delivery_note ?? "Notification logged");
      setTitle("");
      setMessage("");
      qc.invalidateQueries({ queryKey: ["admin", "notifications"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = data?.notifications ?? [];
  const pagination = data?.pagination;

  const canSend = title.trim().length > 0 && message.trim().length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Compose a broadcast to all active caterer accounts. Each send is stored in the log below.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Send to all users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-xl">
          <div className="grid gap-2">
            <Label htmlFor="notif-title">Title</Label>
            <Input
              id="notif-title"
              placeholder="e.g. Scheduled maintenance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notif-message">Message</Label>
            <Textarea
              id="notif-message"
              placeholder="Notification body shown in the app…"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button
            onClick={() => sendMutation.mutate()}
            disabled={!canSend || sendMutation.isPending}
          >
            {sendMutation.isPending ? "Sending…" : "Send to all users"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Records audience size (active caterers and FCM token count). Configure Firebase Admin
            on the backend to deliver push notifications to devices.
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Sent log</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load notifications"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Sent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No notifications sent yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.title}</TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {r.message}
                        </TableCell>
                        <TableCell className="text-sm">
                          {r.sent_count} users
                          {r.tokens_count > 0 && (
                            <span className="text-muted-foreground">
                              {" "}
                              · {r.tokens_count} devices
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(r.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>
                    Page {pagination.page} of {pagination.total_pages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page >= pagination.total_pages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
