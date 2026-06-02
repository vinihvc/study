import { cn } from "@/lib/utils";
import type { TestCase } from "@/types/exercise";

type JsonValue = TestCase["expectedInput"];

const isCodeLikeString = (value: string) =>
  /^[a-zA-Z_$][\w$]*\s*\(/.test(value) ||
  value.includes("—") ||
  value.includes(" then ");

const formatLiteral = (value: JsonValue): string => {
  if (typeof value === "string") {
    return isCodeLikeString(value) ? value : JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value === null) {
    return "null";
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const formatInputLines = (input: JsonValue): string[] => {
  if (typeof input === "object" && input !== null && !Array.isArray(input)) {
    return Object.entries(input).map(
      ([key, value]) => `${key} = ${formatLiteral(value)}`
    );
  }

  return [formatLiteral(input)];
};

interface ExerciseExamplesProps {
  className?: string;
  tests?: TestCase[];
}

export const ExerciseExamples = ({
  tests,
  className,
}: ExerciseExamplesProps) => {
  if (!tests?.length) {
    return null;
  }

  return (
    <section
      className={cn("not-prose mt-6 flex flex-col gap-6", className)}
      data-slot="exercise-examples"
    >
      {tests.map((test, index) => {
        const inputLines = formatInputLines(test.expectedInput);

        return (
          <div key={test.name}>
            <p className="mb-2 font-semibold text-foreground text-sm">
              Example {index + 1}:
            </p>

            <div className="border-muted-foreground/30 border-l-2 pl-4 font-mono text-[13px] text-muted-foreground leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">Input:</span>
                <div className="mt-1 space-y-0.5">
                  {inputLines.map((line) => (
                    <div
                      className="overflow-x-auto whitespace-nowrap"
                      key={line}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 overflow-x-auto whitespace-nowrap">
                <span className="font-semibold text-foreground">Output: </span>
                {formatLiteral(test.expectedResult)}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
