import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAdminNotifications,
  sendAdminNotification,
  fetchEventReminders,
  triggerReminderCron,
  testEventReminder,
  type EventReminderRow,
} from "@/services/adminService";

type Priority = "normal" | "important" | "critical";

const PRIORITY_LABELS: Record<Priority, string> = {
  normal: "Normal",
  important: "Important",
  critical: "Critical",
};

const PRIORITY_VARIANTS: Record<Priority, "secondary" | "default" | "destructive"> = {
  normal: "secondary",
  important: "default",
  critical: "destructive",
};

const AdminNotifications = () => {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [page, setPage] = useState(1);

  // Reminder test state
  const [reminderPage, setReminderPage] = useState(1);
  const [testEventId, setTestEventId] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "notifications", page],
    queryFn: () => fetchAdminNotifications({ page, limit: 20 }),
  });

  const sendMutation = useMutation({
    mutationFn: () =>
      sendAdminNotification({ title: title.trim(), message: message.trim(), priority }),
    onSuccess: (res) => {
      toast.success(res.delivery_note ?? "Notification logged");
      setTitle("");
      setMessage("");
      setPriority("normal");
      qc.invalidateQueries({ queryKey: ["admin", "notifications"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = data?.notifications ?? [];
  const pagination = data?.pagination;

  const canSend = title.trim().length > 0 && message.trim().length > 0;

  const { data: remindersData, isLoading: remindersLoading, isError: remindersError } = useQuery({
    queryKey: ["admin", "reminders", reminderPage],
    queryFn: () => fetchEventReminders({ page: reminderPage, limit: 20 }),
  });

  const triggerMutation = useMutation({
    mutationFn: triggerReminderCron,
    onSuccess: () => toast.success("Cron triggered — check server logs"),
    onError: (e: Error) => toast.error(e.message),
  });

  const testMutation = useMutation({
    mutationFn: () => testEventReminder(testEventId.trim()),
    onSuccess: (res) => {
      toast.success(`Reminder sent to ${res.push_sent} device(s)`);
      setTestEventId("");
      qc.invalidateQueries({ queryKey: ["admin", "reminders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reminderRows = remindersData?.reminders ?? [];
  const reminderPagination = remindersData?.pagination;

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
          <div className="grid gap-2">
            <Label htmlFor="notif-priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as Priority)}
            >
              <SelectTrigger id="notif-priority" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
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
                    <TableHead>Priority</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Sent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No notifications sent yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((r) => {
                      const p = (r.priority ?? "normal") as Priority;
                      return (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.title}</TableCell>
                          <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                            {r.message}
                          </TableCell>
                          <TableCell>
                            <Badge variant={PRIORITY_VARIANTS[p]}>
                              {PRIORITY_LABELS[p]}
                            </Badge>
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
                      );
                    })
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
      {/* ── Event Reminder Testing ─────────────────────────────────── */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Event Reminder Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-xl">
          <p className="text-xs text-muted-foreground">
            Trigger the reminder cron right now (processes all events in the current 15-min window),
            or send a test reminder for a specific booking event ID immediately.
          </p>
          <Button
            variant="outline"
            onClick={() => triggerMutation.mutate()}
            disabled={triggerMutation.isPending}
          >
            {triggerMutation.isPending ? "Triggering…" : "Run cron now"}
          </Button>

          <div className="flex gap-2 items-center">
            <Input
              placeholder="Booking Event ID (UUID)"
              value={testEventId}
              onChange={(e) => setTestEventId(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => testMutation.mutate()}
              disabled={!testEventId.trim() || testMutation.isPending}
            >
              {testMutation.isPending ? "Sending…" : "Send test reminder"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Reminder Log ───────────────────────────────────────────── */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Reminder log</CardTitle>
        </CardHeader>
        <CardContent>
          {remindersLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : remindersError ? (
            <p className="text-sm text-destructive">Failed to load reminder log</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sent At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminderRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No reminders sent yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    reminderRows.map((r: EventReminderRow) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium text-sm">
                          {r.event.function_type ?? "Event"}
                          {r.booking.business_name && (
                            <span className="block text-xs text-muted-foreground">
                              {r.booking.business_name}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {r.booking.customer_name ?? "—"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {r.event.event_at
                            ? new Date(r.event.event_at).toLocaleString()
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{r.reminder_type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(r.sent_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {reminderPagination && reminderPagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>
                    Page {reminderPagination.page} of {reminderPagination.total_pages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={reminderPage <= 1}
                      onClick={() => setReminderPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={reminderPage >= reminderPagination.total_pages}
                      onClick={() => setReminderPage((p) => p + 1)}
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
