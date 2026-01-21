import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";

export const DIFFICULTY_LIST = ["easy", "medium", "hard"] as const;

export type DifficultType = (typeof DIFFICULTY_LIST)[number];

export const DIFFICULTY_MAP: Record<
  DifficultType,
  {
    label: string;
    variant: VariantProps<typeof badgeVariants>["variant"];
  }
> = {
  easy: {
    label: "Easy",
    variant: "success",
  },
  medium: {
    label: "Medium",
    variant: "warning",
  },
  hard: {
    label: "Hard",
    variant: "destructive",
  },
};
