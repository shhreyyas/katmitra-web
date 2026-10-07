import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DELETE_CONFIRM_WORD,
  bulkDeleteAdminUsers,
  type BulkDeleteUsersResult,
} from "@/services/adminService";

export type UserToDelete = { id: string; label: string };

type DeleteUsersDialogProps = {
  /** Accounts to delete; the dialog is open while this is non-empty. */
  users: UserToDelete[];
  onClose: () => void;
  /** Called after the request finishes, with what was and wasn't deleted. */
  onDone: (result: BulkDeleteUsersResult) => void;
};

/**
 * Confirmation for permanently deleting caterer accounts. Deleting removes the
 * account's business and everything in it, so the admin has to type the
 * confirmation word before the button unlocks.
 */
const DeleteUsersDialog = ({ users, onClose, onDone }: DeleteUsersDialogProps) => {
  const open = users.length > 0;
  const [typed, setTyped] = useState("");
  const [failures, setFailures] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTyped("");
      setFailures([]);
    }
  }, [open]);

  const mutation = useMutation({
    mutationFn: () => bulkDeleteAdminUsers(users.map((u) => u.id)),
    onSuccess: (result) => {
      const labelFor = (id: string) => users.find((u) => u.id === id)?.label ?? id;
      if (result.deleted.length) {
        toast.success(
          `Deleted ${result.deleted.length} user${result.deleted.length === 1 ? "" : "s"}`,
        );
      }
      onDone(result);
      if (result.failed.length) {
        // Keep the dialog open so the reasons can be read.
        setFailures(result.failed.map((f) => `${labelFor(f.id)}: ${f.message}`));
      } else {
        onClose();
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const many = users.length > 1;
  const finished = failures.length > 0;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && !mutation.isPending && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
            {many ? `Delete ${users.length} users permanently?` : "Delete this user permanently?"}
          </DialogTitle>
          <DialogDescription>
            This removes {many ? "each account" : "the account"} and its business, including all
            bookings, quotations, menus, staff, vendors and payment records. It cannot be undone.
            To block access without losing data, use Suspend instead.
          </DialogDescription>
        </DialogHeader>

        <ul className="max-h-40 space-y-1 overflow-y-auto rounded-md border border-border/60 p-3 text-sm">
          {users.map((u) => (
            <li key={u.id} className="truncate">
              {u.label}
            </li>
          ))}
        </ul>

        {finished ? (
          <div role="alert" className="space-y-1 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
            <p className="font-medium">Not deleted:</p>
            <ul className="list-disc space-y-1 pl-5">
              {failures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label htmlFor="delete-confirm">
              Type <span className="font-mono font-semibold">{DELETE_CONFIRM_WORD}</span> to confirm
            </Label>
            <Input
              id="delete-confirm"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              disabled={mutation.isPending}
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
            {finished ? "Close" : "Cancel"}
          </Button>
          {finished ? null : (
            <Button
              variant="destructive"
              disabled={typed !== DELETE_CONFIRM_WORD || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Deleting…
                </>
              ) : many ? (
                `Delete ${users.length} users`
              ) : (
                "Delete user"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUsersDialog;
