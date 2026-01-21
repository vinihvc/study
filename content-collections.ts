import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { z } from "zod";
import { extractHeadingsFromContent, headingSchema } from "@/utils/toc";

const exercises = defineCollection({
  name: "exercises",
  directory: "src/content/exercises",
  include: "**/*.(md|mdx)",
  schema: z.object({
    title: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string(),
    solved: z.boolean().optional(),
    headings: z.array(headingSchema).optional(),
    prev: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
      })
      .optional(),
    next: z
      .object({
        title: z.string().optional(),
        slug: z.string().optional(),
      })
      .optional(),
  }),
  transform: async (doc, context) => {
    const [mdx, headings] = await Promise.all([
      compileMDX(context, doc, {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              test: ["h2", "h3", "h4"],
              properties: {
                className: ["heading-link"],
              },
            },
          ],
          [
            rehypeShiki,
            {
              theme: "github-dark",
              langs: ["typescript"],
            },
          ],
        ],
      }),
      extractHeadingsFromContent(doc.content, { tags: ["h2", "h3", "h4"] }),
    ]);

    const docs = await context.collection.documents();
    const idx = docs.findIndex((d) => doc._meta.filePath === d._meta.filePath);

    return {
      ...doc,
      prev: {
        title: idx > 0 ? docs[idx - 1].title : null,
        slug:
          idx > 0 ? docs[idx - 1].title.toLowerCase().replace(/ /g, "-") : null,
      },
      next: {
        title: idx < docs.length - 1 ? docs[idx + 1].title : null,
        slug:
          idx < docs.length - 1
            ? docs[idx + 1].title.toLowerCase().replace(/ /g, "-")
            : null,
      },
      mdx,
      slug: doc.title.toLowerCase().replace(/ /g, "-"),
      headings,
    };
  },
});

export default defineConfig({ collections: [exercises] });
