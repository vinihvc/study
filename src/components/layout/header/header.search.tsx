import { useListCollection } from "@ark-ui/react/collection";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiCornerDownLeftLine,
  RiSearchLine,
} from "@remixicon/react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandContent,
  CommandDialog,
  CommandDialogContent,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import type { SearchExerciseItem } from "@/lib/exercises";
import { DIFFICULTY_MAP } from "@/types/difficulty";

interface CommandSearchItem extends SearchExerciseItem {
  label: string;
  value: string;
}

const rootRoute = getRouteApi("__root__");

export const HeaderSearch = () => {
  const navigate = useNavigate();
  const { searchExercises = [] } = rootRoute.useLoaderData();

  const [open, setOpen] = React.useState(false);

  const searchItems = React.useMemo<CommandSearchItem[]>(
    () =>
      searchExercises.map((exercise) => ({
        ...exercise,
        label: exercise.title,
        value: exercise.slug,
      })),
    [searchExercises]
  );

  const { collection, filter } = useListCollection<CommandSearchItem>({
    filter: (itemText, filterText) =>
      itemText.toLowerCase().includes(filterText.toLowerCase()),
    initialItems: searchItems,
  });

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

  const handleSelect = (slug: string) => {
    setOpen(false);
    navigate({
      params: { slug },
      to: "/e/$slug",
    });
  };

  return (
    <CommandDialog
      onOpenChange={(details) => setOpen(details.open)}
      open={open}
    >
      <CommandDialogTrigger asChild>
        <Button className="bg-input/5" variant="outline">
          <RiSearchLine />
          <span className="max-sm:hidden">Search...</span>
          <KbdGroup className="max-sm:hidden">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
      </CommandDialogTrigger>

      <CommandDialogContent>
        <Command
          collection={collection}
          key={searchItems.map((item) => item.slug).join("-")}
          onInputValueChange={({ inputValue }) => filter(inputValue)}
          onValueChange={({ value }) => {
            const slug = value.at(0);

            if (slug) {
              handleSelect(slug);
            }
          }}
        >
          <CommandInput placeholder="Search..." />

          <CommandContent>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {collection.items.map((item) => {
                const difficulty = DIFFICULTY_MAP[item.difficulty];

                return (
                  <CommandItem
                    className="flex items-center justify-between gap-2"
                    item={item}
                    key={item.value}
                    onClick={() => handleSelect(item.slug)}
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
              })}
            </CommandList>
          </CommandContent>

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
      </CommandDialogContent>
    </CommandDialog>
  );
};
