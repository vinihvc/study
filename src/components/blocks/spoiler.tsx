"use client";

import {
  RiCheckLine,
  RiCloseLine,
  RiEyeCloseLine,
  RiEyeLine,
} from "@remixicon/react";
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
      <div className="in-data-[status=hidden]:blur-md">{children}</div>

      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center rounded-sm border bg-card/20">
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

      {revealed && (
        <>
          <Button
            className="absolute top-2 right-2"
            onClick={() => setRevealed(false)}
            size="sm"
            variant="outline"
          >
            <RiEyeCloseLine />
            <span className="sr-only">Click to hide</span>
          </Button>

          {alwaysRevealed ? (
            <Button
              className="absolute -top-2 right-0 -translate-y-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setAlwaysRevealed(false)}
              size="xs"
              variant="success"
            >
              <RiCheckLine />
              Always revealing
            </Button>
          ) : (
            <Button
              className="absolute -top-2 right-0 -translate-y-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setAlwaysRevealed(true)}
              size="xs"
              variant="destructive"
            >
              <RiCloseLine />
              Never revealing
            </Button>
          )}
        </>
      )}
    </div>
  );
};
