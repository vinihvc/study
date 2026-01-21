import type { Exercise } from "content-collections";
import { cn } from "@/lib/utils";
import { DIFFICULTY_MAP } from "@/types/difficulty";
import { Badge } from "./badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface ItemCardProps extends React.ComponentProps<typeof Card> {
  /**
   */
  data: Exercise;
}

export const ItemCard = (props: ItemCardProps) => {
  const { data, className, children, ...rest } = props;

  return (
    <Card
      className={cn(
        "relative focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        className
      )}
      {...rest}
    >
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>

        <CardDescription className="line-clamp-2">
          {data.excerpt}
        </CardDescription>
        <CardAction>
          <Badge
            className="uppercase"
            size="sm"
            variant={DIFFICULTY_MAP[data.difficulty].variant}
          >
            {data.difficulty}
          </Badge>
        </CardAction>
      </CardHeader>

      {children}
    </Card>
  );
};
