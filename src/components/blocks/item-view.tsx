import { useSearch } from "@tanstack/react-router";
import type React from "react";
import { cn } from "@/lib/utils";

export const ItemView = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;

  const search = useSearch({ from: "/" });

  const { view } = search;

  if (view === "list") {
    return <div className={cn("flex flex-col gap-4", className)} {...rest} />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...rest}
    />
  );
};
