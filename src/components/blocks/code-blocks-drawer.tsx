"use client";

import { RiCodeSSlashLine } from "@remixicon/react";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerContentInner,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

import { CodeBlocks } from "./code-blocks";

interface CodeBlocksDrawerProps {
  className?: string;
  slug: string;
  starter: string;
}

export const CodeBlocksDrawer = ({
  slug,
  starter,
  className,
}: CodeBlocksDrawerProps) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const swipeDirection = isMobile ? "down" : "end";

  return (
    <div className={cn("lg:hidden", className)}>
      <Drawer
        key={swipeDirection}
        modal={false}
        swipeDirection={swipeDirection}
      >
        <DrawerTrigger asChild>
          <Button
            aria-label="Open code editor"
            className="fixed inset-e-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 shadow-md"
            size="lg"
          >
            <RiCodeSSlashLine />
            Open Editor
          </Button>
        </DrawerTrigger>

        <DrawerContent variant={isMobile ? "default" : "inset"}>
          <DrawerContentInner className="max-w-none text-start">
            <DrawerHeader className="sr-only" title="Code editor" />
            <DrawerBody className="px-3 pt-0 pb-3">
              <CodeBlocks slug={slug} starter={starter} />
            </DrawerBody>
          </DrawerContentInner>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
