import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Language dropdown + theme switch for the header (and standalone pages).
 */
const HeaderControls = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-3",
        className,
      )}
    >
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default HeaderControls;
