import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fetchBusinesses } from "@/services/adminService";
import { cn } from "@/lib/utils";

type BusinessPickerProps = {
  /** Selected business id, or "" for all businesses. */
  value: string;
  onChange: (businessId: string) => void;
  className?: string;
};

/** Searchable business filter: pick a caterer by name instead of pasting its id. */
const BusinessPicker = ({ value, onChange, className }: BusinessPickerProps) => {
  const [open, setOpen] = useState(false);
  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: () => fetchBusinesses(),
  });

  const selected = businesses.find((b) => b.id === value);
  const label = selected?.name ?? (value ? "Selected business" : "All businesses");

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Filter by business"
            className="w-56 justify-between font-normal"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>{label}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search business or owner…" />
            <CommandList>
              <CommandEmpty>{isLoading ? "Loading businesses…" : "No business found"}</CommandEmpty>
              <CommandGroup>
                {businesses.map((b) => (
                  <CommandItem
                    key={b.id}
                    value={`${b.name} ${b.ownerName ?? ""} ${b.id}`}
                    onSelect={() => {
                      onChange(b.id === value ? "" : b.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", b.id === value ? "opacity-100" : "opacity-0")}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block truncate">{b.name}</span>
                      {b.ownerName ? (
                        <span className="block truncate text-xs text-muted-foreground">
                          {b.ownerName}
                        </span>
                      ) : null}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Clear business filter"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
};

export default BusinessPicker;
