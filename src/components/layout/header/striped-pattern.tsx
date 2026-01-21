import type React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface StripedPatternProps extends React.ComponentProps<"svg"> {
  /**
   * The direction of the stripes.
   */
  direction?: "left" | "right";
}

export const StripedPattern = (props: StripedPatternProps) => {
  const {
    direction = "left",
    width = 10,
    height = 10,
    className,
    ...rest
  } = props;

  const id = useId();
  const w = Number(width);
  const h = Number(height);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[-1] h-full w-full stroke-[0.5]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <defs>
        <pattern height={h} id={id} patternUnits="userSpaceOnUse" width={w}>
          {direction === "left" ? (
            <>
              <line stroke="currentColor" x1="0" x2={w} y1={h} y2="0" />
              <line stroke="currentColor" x1={-w} x2="0" y1={h} y2="0" />
              <line stroke="currentColor" x1={w} x2={w * 2} y1={h} y2="0" />
            </>
          ) : (
            <>
              <line stroke="currentColor" x1="0" x2={w} y1="0" y2={h} />
              <line stroke="currentColor" x1={-w} x2="0" y1="0" y2={h} />
              <line stroke="currentColor" x1={w} x2={w * 2} y1="0" y2={h} />
            </>
          )}
        </pattern>
      </defs>

      <rect fill={`url(#${id})`} height="100%" width="100%" />
    </svg>
  );
};
