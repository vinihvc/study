import { createFileRoute, Link } from "@tanstack/react-router";
import { allExercises } from "content-collections";
import z from "zod";
import { Filter } from "@/components/blocks/filter";
import { ItemView } from "@/components/blocks/item-view";
import { ItemCard } from "@/components/ui/item-card";

const searchSchema = z.object({
  view: z.enum(["list", "grid"]).default("grid").optional(),
});

const SORT_ORDER = ["easy", "medium", "hard"] as const;

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search) => searchSchema.parse(search),
  loader: () => {
    const sortedExercises = allExercises.sort(
      (a, b) =>
        SORT_ORDER.indexOf(a.difficulty) - SORT_ORDER.indexOf(b.difficulty)
    );

    return {
      exercises: sortedExercises,
    };
  },
});

function Home() {
  const { exercises } = Route.useLoaderData();

  return (
    <main>
      <div className="container grid gap-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold text-xl">Algorithms</h1>
          <Filter />
        </div>

        <ItemView>
          {exercises.map((item) => (
            <ItemCard data={item} key={item.slug}>
              <Link
                className="absolute inset-0 outline-none"
                params={{ slug: item.slug }}
                to="/e/$slug"
              >
                <span className="sr-only">View {item.title}</span>
              </Link>
            </ItemCard>
          ))}
        </ItemView>
      </div>
    </main>
  );
}
