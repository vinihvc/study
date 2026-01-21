import { RiInformationLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export const BigO = (props: React.ComponentProps<typeof Popover>) => {
  return (
    <Popover {...props}>
      <PopoverTrigger render={<Button variant="secondary" />}>
        <RiInformationLine />
        Lern more complexity concepts
      </PopoverTrigger>

      <PopoverContent align="start" className="text-sm sm:w-[500px]" side="top">
        <div className="flex flex-col gap-2 text-pretty">
          <h3 className="font-medium">Big O Notation</h3>
          <p className="text-muted-foreground">
            It is used to describe the performance of an algorithm in terms of
            the input size.
          </p>

          <p>
            <Badge variant="success">O(1)</Badge> is the best performance
            because it needs to perform a constant number of operations.
          </p>

          <Separator className="my-2" />

          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Examples</h4>

            <ul className="list-inside list-disc space-y-2 text-muted-foreground text-sm">
              <li>
                <span className="font-semibold underline">Filter</span> is{" "}
                <Badge variant="info">O(n)</Badge> in the general case, because
                it needs to check each element in the array once.
              </li>
              <li>
                <span className="font-semibold underline">Sorting</span> is
                typically <Badge variant="info">O(n log n)</Badge> for efficient
                algorithms like mergesort or quicksort on average. However, some
                sorts like bubble sort are{" "}
                <Badge variant="warning">O(n²)</Badge>.
              </li>
              <li>
                <span className="font-semibold underline">Fibonacci</span>{" "}
                sequence computation can range from{" "}
                <Badge variant="warning">O(2ⁿ)</Badge> (naive recursive) to{" "}
                <Badge variant="info">O(n)</Badge> (using dynamic programming or
                iteration).
                <span className="italic">
                  Efficient algorithms use O(n) time.
                </span>
              </li>
              <li>
                <span className="font-semibold underline">Hash Table</span> is
                generally <Badge variant="success">O(1)</Badge> on average,
                because accessing an item by key does not depend on the size of
                the collection. However, in worst-case scenarios (many hash
                collisions), the complexity can degrade.
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
