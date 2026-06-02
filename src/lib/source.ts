import { exercises } from "collections/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

export const source = loader({
  baseUrl: "/e",
  slugs(file) {
    return [file.data.title.toLowerCase().replaceAll(" ", "-")];
  },
  source: toFumadocsSource(exercises, []),
});
