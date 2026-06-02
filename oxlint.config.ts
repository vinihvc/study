import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";

export default defineConfig({
  extends: [core, react, tanstack],
  ignorePatterns: [
    ...core.ignorePatterns,
    "_backup-src/**",
    "_backup-root/**",
    "src/components/layout/header/index.ts",
    "src/lib/code-runner.worker.ts",
    "src/lib/run-code.ts",
    "src/components/ui/**",
    "src/components/blocks/code-blocks.tsx",
    "src/components/layout/**",
    "src/components/blocks/spoiler.tsx",
    "src/components/content-block.tsx",
    "src/routes/**",
  ],
});
