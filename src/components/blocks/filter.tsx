import { RiFileListLine, RiLayoutGridLine } from "@remixicon/react";
import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Group } from "../ui/group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const Filter = () => {
  const search = useSearch({ from: "/" });

  const { view } = search;

  return (
    <nav data-slot="filter">
      <Group aria-label="View Mode">
        <Tooltip aria-label="List">
          <TooltipTrigger
            render={
              <Button
                render={
                  <Link search={(prev) => ({ ...prev, view: "list" })} to="." />
                }
                variant={view === "list" ? "solid" : "outline"}
              />
            }
          >
            <RiFileListLine />
          </TooltipTrigger>

          <TooltipContent>View in list</TooltipContent>
        </Tooltip>

        <Tooltip aria-label="Grid">
          <TooltipTrigger
            render={
              <Button
                render={
                  <Link search={(prev) => ({ ...prev, view: "grid" })} to="." />
                }
                variant={view === "grid" ? "solid" : "outline"}
              />
            }
          >
            <RiLayoutGridLine />
          </TooltipTrigger>
          <TooltipContent>View in grid</TooltipContent>
        </Tooltip>
      </Group>
    </nav>
  );
};
