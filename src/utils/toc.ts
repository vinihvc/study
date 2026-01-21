import type { Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import z from "zod";

export const headingSchema = z.object({
  id: z.string(),
  text: z.string(),
  depth: z.number(),
});

export type Heading = z.infer<typeof headingSchema>;

/**
 * Extracts headings from a HAST (HTML Abstract Syntax Tree) node
 * @param tree - The HAST root node
 * @param options - Configuration options
 * @returns Array of headings with id, text, and depth
 */
export function extractHeadings(
  tree: Root,
  options: {
    /**
     * Heading tags to include (e.g., ['h2', 'h3', 'h4'])
     * @default ['h2', 'h3', 'h4']
     */
    tags?: string[];
  } = {}
): Heading[] {
  const { tags = ["h2", "h3", "h4"] } = options;
  const headings: Heading[] = [];

  visit(tree, "element", (node) => {
    if (tags.includes(node.tagName)) {
      const text = hastToString(node);
      const id =
        (typeof node.properties?.id === "string" ? node.properties.id : null) ||
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");

      headings.push({
        id,
        text,
        depth: Number.parseInt(node.tagName.slice(1), 10),
      });
    }
  });

  return headings;
}

/**
 * Extracts headings from markdown/MDX content
 * @param content - Raw markdown/MDX content string
 * @param options - Configuration options
 * @returns Promise that resolves to array of headings
 */
export async function extractHeadingsFromContent(
  content: string,
  options: {
    /**
     * Heading tags to include (e.g., ['h2', 'h3', 'h4'])
     * @default ['h2', 'h3', 'h4']
     */
    tags?: string[];
  } = {}
): Promise<Heading[]> {
  const { tags = ["h2", "h3", "h4"] } = options;

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug);

  const tree = (await processor.run(processor.parse(content))) as Root;
  return extractHeadings(tree, { tags });
}
