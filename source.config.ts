import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

import { testCaseSchema } from "./src/types/exercise";

export const exercises = defineCollections({
  dir: "src/content/exercises",
  schema: z.object({
    description: z.string().optional(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    excerpt: z.string().optional(),
    solved: z.boolean().optional(),
    starter: z.string(),
    tests: z.array(testCaseSchema).optional(),
    title: z.string(),
  }),
  type: "doc",
});

export default defineConfig({});
