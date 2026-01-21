import { createFileRoute, Link } from "@tanstack/react-router";
import { allExercises } from "content-collections";
import { ItemCard } from "@/components/ui/item-card";

const SORT_ORDER = ["easy", "medium", "hard"] as const;

export const Route = createFileRoute("/")({
  component: Home,
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
        <h1 className="font-semibold text-xl">List of Exercises</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>
    </main>
  );
}
