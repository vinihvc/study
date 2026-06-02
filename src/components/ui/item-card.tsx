import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ExerciseListItem } from "@/lib/exercises";
import { cn } from "@/lib/utils";
import { DIFFICULTY_MAP } from "@/types/difficulty";

interface ItemCardProps extends React.ComponentProps<typeof Card> {
  data: ExerciseListItem;
}

export const ItemCard = (props: ItemCardProps) => {
  const { data, className, children, ...rest } = props;
  const difficulty = DIFFICULTY_MAP[data.difficulty];

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
          <Badge className="uppercase" size="sm" variant={difficulty.variant}>
            {difficulty.label}
          </Badge>
        </CardAction>
      </CardHeader>

      {children}
    </Card>
  );
};
