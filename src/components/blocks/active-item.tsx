import { cn } from "@/lib/utils";

interface ActiveItemProps extends React.ComponentProps<"a"> {
  /**
   * The heading text
   */
  children: React.ReactNode;
  /**
   * The heading depth (2, 3, 4, etc.)
   */
  depth: number;
  /**
   * Whether this item is currently active
   */
  isActive?: boolean;
}

/**
 * Component to display a table of contents item with active state styling
 */
export const ActiveItem = ({
  isActive = false,
  depth,
  className,
  children,
  ...props
}: ActiveItemProps) => (
  <a
    className={cn(
      "block transition-colors hover:underline",
      depth === 2 && "pl-0",
      depth === 3 && "pl-4",
      depth === 4 && "pl-8",
      isActive
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </a>
);
