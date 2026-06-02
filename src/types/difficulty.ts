import type { BadgeVariant } from "@/components/ui/badge";

export const DIFFICULTY_LIST = ["easy", "medium", "hard"] as const;

export type DifficultType = (typeof DIFFICULTY_LIST)[number];

export const DIFFICULTY_MAP: Record<
  DifficultType,
  {
    label: string;
    variant: BadgeVariant;
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
