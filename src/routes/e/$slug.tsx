import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allExercises } from "content-collections";
import { CodeBlocks } from "@/components/blocks/code-blocks";
import { CodeBlocksDrawer } from "@/components/blocks/code-blocks-drawer";
import { ExerciseExamples } from "@/components/blocks/exercise-examples";
import { ContentBlock } from "@/components/content-block";
import { BigO } from "@/components/knowledge/big-o";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DIFFICULTY_MAP } from "@/types/difficulty";
import { generateSeoTags } from "@/utils/seo";

export const Route = createFileRoute("/e/$slug")({
  component: RouteComponent,
  loader: ({ params }) => {
    const exercise = allExercises.find(
      (exercise) => exercise.slug === params.slug
    );

    if (!exercise) {
      throw notFound();
    }

    return {
      exercise,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.exercise?.title,
      },
      ...generateSeoTags({
        title: loaderData?.exercise?.title || "",
        description: loaderData?.exercise?.description,
      }),
    ],
  }),
});

function RouteComponent() {
  const { exercise } = Route.useLoaderData();

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
              <ContentBlock code={exercise.mdx} />
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
}
