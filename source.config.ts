import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ])
);

export const exercises = defineCollections({
  dir: "src/content/exercises",
  schema: z.object({
    description: z.string().optional(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    excerpt: z.string().optional(),
    solved: z.boolean().optional(),
    starter: z.string(),
    tests: z
      .array(
        z.object({
          code: z.string(),
          compare: z.enum(["exact", "unordered"]).optional(),
          expectedInput: jsonValueSchema,
          expectedResult: jsonValueSchema,
          name: z.string(),
        })
      )
      .optional(),
    title: z.string(),
  }),
  type: "doc",
});

export default defineConfig({});
