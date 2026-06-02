import { createRouter } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/pages/error";
import { NotFound } from "@/components/pages/not-found";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPreload: "intent",
    routeTree,
    scrollRestoration: true,
  });

  return router;
};
