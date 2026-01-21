import { RiAlignLeft } from "@remixicon/react";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useActiveItem } from "@/hooks/use-active-item";
import { cn } from "@/lib/utils";
import type { Heading } from "@/utils/toc";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

interface ToCProps extends React.ComponentProps<"nav"> {
  /**
   * The headings to display in the table of contents
   */
  headings?: Heading[];
}

export const ToC = (props: ToCProps) => {
  const { className, headings = [], ...rest } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const itemIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeHeading = useActiveItem(itemIds);

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger
          className="fixed right-4 bottom-4 z-50"
          render={<Button size="icon-lg" />}
        >
          <RiAlignLeft />
        </PopoverTrigger>

        <PopoverContent align="end" className="w-72">
          <h3 className="flex items-center gap-2 font-semibold text-sm [&_svg]:size-4">
            <RiAlignLeft />
            On this page
          </h3>

          <ul className="mt-4">
            {headings?.map((heading) => {
              const isActive = heading.id === activeHeading;

              return (
                <PopoverClose
                  key={heading.id}
                  render={<ToCItem heading={heading} isActive={isActive} />}
                />
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <nav
      className={cn("h-fit w-full rounded-lg", className)}
      data-slot="toc"
      {...rest}
    >
      {headings.length > 0 && (
        <>
          <h3 className="flex items-center gap-2 font-semibold text-sm [&_svg]:size-4">
            <RiAlignLeft />
            On this page
          </h3>

          <ul className="mt-4 space-y-2 text-sm">
            {headings?.map((heading) => {
              const isActive = heading.id === activeHeading;

              return (
                <ToCItem
                  heading={heading}
                  isActive={isActive}
                  key={heading.id}
                />
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
};

interface ToCItemProps extends React.ComponentProps<"li"> {
  /**
   * The heading to display in the table of contents
   */
  heading: Heading;
  /**
   * Whether this item is currently active
   */
  isActive: boolean;
}

export const ToCItem = (props: ToCItemProps) => {
  const { heading, isActive, className, ...rest } = props;

  return (
    <li
      className={cn(
        "transition-colors",
        heading.depth === 2 && "pl-0",
        heading.depth === 3 && "pl-4",
        heading.depth === 4 && "pl-8"
      )}
      {...rest}
    >
      <a
        className={cn(
          "block transition-colors hover:underline focus-visible:text-primary focus-visible:underline focus-visible:outline-none max-md:py-1.5",
          isActive
            ? "font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        href={`#${heading.id}`}
      >
        {heading.text}
      </a>
    </li>
  );
};
