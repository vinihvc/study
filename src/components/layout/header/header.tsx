import {
  RiCodeSSlashLine,
  RiCornerDownLeftFill,
  RiGithubFill,
} from "@remixicon/react";
import { Link, useRouterState } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

import { HeaderSearch } from "./header.search";

interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header = (props: HeaderProps) => {
  const { className, ...rest } = props;

  const router = useRouterState();

  const isHome = router.location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 box-border w-full md:top-4 md:px-4",
        className
      )}
      data-slot="site-header"
      {...rest}
    >
      <div className="container flex h-14 items-center justify-between rounded-md border border-border/32 bg-card/60 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="zoom-in-95 animate-in blur-in-xs duration-100"
            key={isHome ? "home" : "not-home"}
            size="lg"
            variant="ghost"
          >
            <Link to="/">
              {router.location.pathname === "/" ? (
                <>
                  <RiCodeSSlashLine />
                  <span className="max-sm:hidden">Study</span>
                </>
              ) : (
                <>
                  <RiCornerDownLeftFill />
                  Back <span className="max-sm:hidden"> to Home</span>
                </>
              )}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <HeaderSearch />

          <Separator className="h-4" orientation="vertical" />

          <div>
            <Button asChild size="icon-md" variant="outline">
              <a
                href={SITE_CONFIG.repoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">GitHub</span>
                <RiGithubFill />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
