"use client";

import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SpoilerProps extends React.ComponentProps<"div"> {}

export const Spoiler = (props: SpoilerProps) => {
  const { className, children, ...rest } = props;

  const [alwaysRevealed, setAlwaysRevealed] = useLocalStorage(
    "always-revealed",
    false
  );

  const [revealed, setRevealed] = React.useState(alwaysRevealed);

  return (
    <div
      className={cn("group relative", className)}
      data-slot="spoiler"
      data-status={revealed ? "revealed" : "hidden"}
      {...rest}
    >
      {revealed && (
        <div className="absolute -top-1 right-2 flex -translate-y-full items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          {alwaysRevealed ? (
            <Button
              onClick={() => setAlwaysRevealed(false)}
              size="sm"
              variant="secondary"
            >
              Always revealing
            </Button>
          ) : (
            <Button
              className="bg-destructive/32 hover:bg-destructive/40"
              onClick={() => setAlwaysRevealed(true)}
              size="sm"
              variant="secondary"
            >
              Never revealing
            </Button>
          )}

          <Button
            onClick={() => setRevealed(false)}
            size="sm"
            variant="secondary"
          >
            <RiEyeCloseLine />
            <span className="sr-only">Click to hide</span>
          </Button>
        </div>
      )}

      <div className="relative overflow-hidden rounded-md">
        <div className="in-data-[status=hidden]:blur-md">{children}</div>

        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md border bg-card/20">
            <button
              className="peer absolute inset-0 outline-none"
              onClick={() => setRevealed(true)}
              type="button"
            >
              <span className="sr-only">Click to reveal</span>
            </button>

            <div
              className={cn(
                "pointer-events-none size-full",
                "flex items-center justify-center gap-2",
                "px-4",
                "font-medium text-xs",
                "ring-ring peer-focus-visible:ring-2"
              )}
            >
              <RiEyeLine className="size-4" />
              Click to reveal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
