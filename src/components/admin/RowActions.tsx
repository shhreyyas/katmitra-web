import { useState, type ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type RowAction = {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
  /** Shown under the label when the action is disabled, to say why. */
  disabledReason?: string;
  /** When set, the action asks for confirmation before running. */
  confirm?: { title: ReactNode; description?: ReactNode };
};

/** The "⋯" menu at the end of a table row. `name` identifies the row for screen readers. */
const RowActions = ({ name, actions }: { name: string; actions: RowAction[] }) => {
  const [pending, setPending] = useState<RowAction | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Actions for ${name}`}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              disabled={action.disabled}
              className={cn(action.destructive && "text-destructive focus:text-destructive")}
              onSelect={() => (action.confirm ? setPending(action) : action.onSelect())}
            >
              <span>
                {action.label}
                {action.disabled && action.disabledReason ? (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {action.disabledReason}
                  </span>
                ) : null}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pending?.confirm?.title}</AlertDialogTitle>
            {pending?.confirm?.description ? (
              <AlertDialogDescription>{pending.confirm.description}</AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={cn(pending?.destructive && buttonVariants({ variant: "destructive" }))}
              onClick={() => pending?.onSelect()}
            >
              {pending?.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RowActions;
