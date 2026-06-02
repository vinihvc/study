/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type React from "react";
import { MediaQuery } from "@/components/debug/media-query";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StripedPattern } from "@/components/layout/header/striped-pattern";
import { DefaultCatchBoundary } from "@/components/pages/error";
import { NotFound } from "@/components/pages/not-found";
import { SITE_CONFIG } from "@/config/site";
import appCss from "@/styles/globals.css?url";
import { generateSeoTags } from "@/utils/seo";

const loadRootData = createServerFn({ method: "GET" }).handler(async () => {
  const { getSearchExercises } = await import("@/lib/exercises");
  return { searchExercises: getSearchExercises() };
});

const RootDocument = ({ children }: React.PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <HeadContent />
    </head>

    <body>
      {children}

      <MediaQuery />

      <Scripts />
    </body>
  </html>
);

const RootLayout = () => (
  <>
    <StripedPattern className="mask-[radial-gradient(98dvh_circle_at_center,white,transparent)] opacity-10" />

    <Header />

    <Outlet />

    <Footer />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => loadRootData(),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      ...generateSeoTags({
        creator: SITE_CONFIG.creator,
        description: SITE_CONFIG.description,
        image: SITE_CONFIG.ogImage,
        keywords: SITE_CONFIG.keywords,
        title: SITE_CONFIG.name,
      }),
      {
        name: "title",
        template: "Study - %s",
      },
    ],
    links: [
      { href: appCss, rel: "stylesheet" },
      {
        href: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      {
        href: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        href: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      { color: "#fffff", href: "/site.webmanifest", rel: "manifest" },
      { href: "/favicon.ico", rel: "icon" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});
