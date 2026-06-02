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

export const testCaseSchema = z.object({
  name: z.string(),
  code: z.string(),
  expectedInput: jsonValueSchema,
  expectedResult: jsonValueSchema,
  compare: z.enum(["exact", "unordered"]).optional(),
});

export type TestCase = z.infer<typeof testCaseSchema>;
