import type { MDXComponents } from "mdx/types";

import { Spoiler } from "@/components/blocks/spoiler";
import { BigO } from "@/components/knowledge/big-o";
import { cn } from "@/lib/utils";

import { ScrollArea } from "./ui/scroll-area";

const mdxComponents = {
  BigO,
  Spoiler,
  pre: ({ tabIndex, className, ...rest }: React.ComponentProps<"pre">) => (
    <ScrollArea className="my-6 w-full overflow-hidden rounded-md border bg-card">
      <pre
        className={cn(
          "w-max min-w-full overflow-visible bg-transparent! p-4 text-[13px] leading-relaxed outline-none",
          "[&_code]:block",
          className
        )}
        {...rest}
      />
    </ScrollArea>
  ),
} satisfies MDXComponents;

interface ContentBlockProps {
  body: React.ComponentType<{ components?: MDXComponents }>;
}

export const ContentBlock = ({ body: MDX }: ContentBlockProps) => (
  <>
    <style>
      {`
        code {
          counter-reset: step;
          counter-increment: step 0;
        }

        code .line::before {
          content: counter(step);
          counter-increment: step;
          width: 1rem;
          margin-right: 1.5rem;
          display: inline-block;
          text-align: right;
          color: rgba(115, 138, 148, 0.4);
        }
      `}
    </style>

    <MDX components={mdxComponents} />
  </>
);
