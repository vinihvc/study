import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ItemCard } from "@/components/ui/item-card";

const loadExercises = createServerFn({ method: "GET" }).handler(async () => {
  const { getExerciseListItems } = await import("@/lib/exercises");
  return { exercises: getExerciseListItems() };
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => loadExercises(),
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
