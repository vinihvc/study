import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import {
  createFileRoute,
  getRouteApi,
  Link,
  notFound,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import browserCollections from "collections/browser";
import { CodeBlocks } from "@/components/blocks/code-blocks";
import { CodeBlocksDrawer } from "@/components/blocks/code-blocks-drawer";
import { ExerciseExamples } from "@/components/blocks/exercise-examples";
import { ContentBlock } from "@/components/content-block";
import { BigO } from "@/components/knowledge/big-o";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ExerciseDetail } from "@/lib/exercises";
import { DIFFICULTY_MAP } from "@/types/difficulty";
import { generateSeoTags } from "@/utils/seo";

const exerciseClientLoader = browserCollections.exercises.createClientLoader({
  component({ default: MDX }) {
    return <ContentBlock body={MDX} />;
  },
});

const loadExercise = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { getExerciseMetaBySlug } = await import("@/lib/exercises");
    const result = getExerciseMetaBySlug(slug);

    if (!result) {
      throw notFound();
    }

    return result;
  });

const exerciseRoute = getRouteApi("/e/$slug");

type ExerciseLoaderData = { exercise: ExerciseDetail; path: string };

const RouteComponent = () => {
  const { exercise, path } =
    exerciseRoute.useLoaderData() as ExerciseLoaderData;

  const difficulty = DIFFICULTY_MAP[exercise.difficulty];

  return (
    <main>
      <div className="container flex max-w-7xl flex-1 flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <article className="min-w-0 flex-1">
            <div className="flex flex-col gap-2">
              <div>
                <Badge
                  className="uppercase"
                  size="sm"
                  variant={difficulty.variant}
                >
                  {difficulty.label}
                </Badge>
              </div>

              <h1 className="font-bold text-xl">{exercise.title}</h1>

              <p className="text-muted-foreground text-sm">
                {exercise.description}
              </p>
            </div>

            <Separator className="my-4" />

            <div className="prose min-w-0">
              {exerciseClientLoader.useContent(path)}
            </div>

            <ExerciseExamples tests={exercise.tests} />
          </article>

          <aside className="hidden w-full shrink-0 lg:sticky lg:top-28 lg:block lg:w-xl">
            <CodeBlocks slug={exercise.slug} starter={exercise.starter} />
          </aside>
        </div>

        <CodeBlocksDrawer slug={exercise.slug} starter={exercise.starter} />

        <div>
          <BigO />
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            {exercise.prev.slug && (
              <Button asChild>
                <Link params={{ slug: exercise.prev.slug }} to="/e/$slug">
                  <RiArrowLeftLine />
                  <span className="max-sm:hidden">
                    Previous ({exercise.prev.title})
                  </span>
                </Link>
              </Button>
            )}
          </div>

          {exercise.next.slug && (
            <Button asChild>
              <Link params={{ slug: exercise.next.slug }} to="/e/$slug">
                <span className="max-sm:hidden">
                  Next ({exercise.next.title})
                </span>
                <RiArrowRightLine />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export const Route = createFileRoute("/e/$slug")({
  component: RouteComponent,
  head: ({ loaderData }: { loaderData?: ExerciseLoaderData }) => ({
    meta: [
      {
        title: loaderData?.exercise.title,
      },
      ...generateSeoTags({
        description: loaderData?.exercise.description,
        title: loaderData?.exercise.title || "",
      }),
    ],
  }),
  loader: async ({ params }): Promise<ExerciseLoaderData> => {
    const data = await loadExercise({ data: params.slug });
    await exerciseClientLoader.preload(data.path);
    return data;
  },
});
