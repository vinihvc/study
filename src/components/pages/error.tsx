import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import { Button } from "../ui/button";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <main className="min-w-0 items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => {
            router.invalidate();
          }}
        >
          Try Again
        </Button>

        {isRoot ? (
          <Button asChild variant="outline">
            <Link to="/">Home</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              to="/"
            >
              Go Back
            </Link>
          </Button>
        )}
      </div>
    </main>
  );
}
