/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type * as React from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StripedPattern } from "@/components/layout/header/striped-pattern";
import { DefaultCatchBoundary } from "@/components/pages/error";
import { NotFound } from "@/components/pages/not-found";
import { SITE_CONFIG } from "@/config/site";
import appCss from "@/styles/globals.css?url";
import { generateSeoTags } from "@/utils/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...generateSeoTags({
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        image: SITE_CONFIG.ogImage,
        keywords: SITE_CONFIG.keywords,
        creator: SITE_CONFIG.creator,
      }),
      {
        name: "title",
        template: "Algorithms - %s",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        src: "/customScript.js",
        type: "text/javascript",
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <StripedPattern className="mask-[radial-gradient(98dvh_circle_at_center,white,transparent)] opacity-10" />

        <Header />

        {children}

        <Footer />

        <Scripts />
      </body>
    </html>
  );
}
