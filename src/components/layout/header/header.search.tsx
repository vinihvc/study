import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCornerDownLeftLine,
  RiSearchLine,
} from "@remixicon/react";
import { useNavigate } from "@tanstack/react-router";
import { allExercises } from "content-collections";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { DIFFICULTY_MAP } from "@/types/difficulty";

export const HeaderSearch = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        render={
          <Button className="bg-input/5" variant="outline">
            <RiSearchLine />
            <span className="max-sm:hidden">Search...</span>
            <KbdGroup className="max-sm:hidden">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        }
      />

      <CommandDialogPopup>
        <Command
          items={allExercises.map((exercise) => ({
            value: exercise.slug,
            label: exercise.title,
            slug: exercise.slug,
            title: exercise.title,
            difficulty: exercise.difficulty,
          }))}
        >
          <CommandInput placeholder="Search..." />

          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(item: (typeof allExercises)[number]) => {
                const difficulty = DIFFICULTY_MAP[item.difficulty];

                return (
                  <CommandItem
                    className="flex items-center justify-between gap-2"
                    key={item.slug}
                    onClick={() => {
                      setOpen(false);
                      navigate({
                        to: "/e/$slug",
                        params: { slug: item.slug },
                      });
                    }}
                    value={item.title}
                  >
                    <span>{item.title}</span>

                    <Badge
                      className="uppercase"
                      size="sm"
                      variant={difficulty.variant}
                    >
                      {difficulty.label}
                    </Badge>
                  </CommandItem>
                );
              }}
            </CommandList>
          </CommandPanel>

          <CommandFooter>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <KbdGroup>
                  <Kbd>
                    <RiArrowUpLine />
                  </Kbd>
                  <Kbd>
                    <RiArrowDownLine />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <Kbd>
                  <RiCornerDownLeftLine />
                </Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
};
