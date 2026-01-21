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
    <header className={cn("fixed inset-x-4 top-4 z-50", className)} {...rest}>
      <div className="container flex h-14 items-center justify-between rounded-md bg-card/60 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            className="zoom-in-95 animate-in blur-in-xs duration-300"
            key={isHome ? "home" : "not-home"}
            render={<Link to="/" />}
            size="lg"
            variant="ghost"
          >
            {router.location.pathname === "/" ? (
              <>
                <RiCodeSSlashLine />
                <span className="max-sm:hidden">Algorithms</span>
              </>
            ) : (
              <>
                <RiCornerDownLeftFill />
                Back <span className="max-sm:hidden"> to Home</span>
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <HeaderSearch />

          <Separator className="h-4" orientation="vertical" />

          <div>
            <Button
              render={
                <a
                  href={SITE_CONFIG.repoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">GitHub</span>
                  <RiGithubFill />
                </a>
              }
              size="icon-md"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
