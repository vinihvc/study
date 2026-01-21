import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const NotFound = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="min-w-0 items-center justify-center gap-6 p-4">
      <div>
        {children || <p>The page you are looking for does not exist.</p>}
      </div>

      <p className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()} variant="outline">
          Go back
        </Button>
        <Button render={<Link to="/" />}>Back to Home</Button>
      </p>
    </main>
  );
};
