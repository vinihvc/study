"use client";

import { autocompletion } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { RiPlayLine } from "@remixicon/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { githubDarkInit } from "@uiw/codemirror-theme-github";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import type { ConsoleRunResult } from "@/lib/run-code";
import { runExerciseCode } from "@/lib/run-code";
import { cn } from "@/lib/utils";

const CodeMirror = React.lazy(() =>
  import("@uiw/react-codemirror").then((module) => ({
    default: module.default,
  }))
);

const CODE_BLOCKS_HEIGHT = "320px";

interface CodeBlocksProps {
  className?: string;
  slug: string;
  starter: string;
}

export const CodeBlocks = ({ slug, starter, className }: CodeBlocksProps) => {
  const storageKey = `exercise-code:${slug}`;

  const [code, setCode] = useLocalStorage(storageKey, starter);

  const [hasRun, setHasRun] = React.useState(false);
  const [result, setResult] = React.useState<ConsoleRunResult | null>(null);
  const [running, setRunning] = React.useState(false);
  const editorRef = React.useRef<HTMLElement>(null);

  const handleRun = async () => {
    if (running) {
      return;
    }

    setHasRun(true);
    setRunning(true);
    setResult(null);

    const output = await runExerciseCode(code);
    setResult(output);
    setRunning(false);
  };

  useHotkey(
    "Mod+Shift+Enter",
    () => {
      handleRun();
    },
    {
      enabled: !running,
      preventDefault: true,
      target: editorRef,
    }
  );

  return (
    <section
      className={cn("not-prose flex flex-col gap-3", className)}
      data-slot="code-blocks"
      ref={editorRef}
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-md border bg-card [&_.cm-editor]:min-h-[320px] [&_.cm-focused]:outline-none"
        style={{
          height: CODE_BLOCKS_HEIGHT,
          minHeight: CODE_BLOCKS_HEIGHT,
        }}
      >
        <Button
          aria-label="Run code"
          className="absolute top-2 right-2 z-10"
          disabled={running}
          onClick={handleRun}
          size="icon-md"
        >
          <RiPlayLine />
        </Button>

        <CodeMirror
          basicSetup={{
            foldGutter: false,
            highlightActiveLine: true,
            lineNumbers: false,
          }}
          className="[&_.cm-scroller]:scrollbar-thin [&_.cm-scroller]:scrollbar-track-transparent [&_.cm-scroller]:scrollbar-thumb-foreground/20 size-full text-[13px] [&_.cm-content]:font-mono [&_.cm-gutters]:border-0 [&_.cm-gutters]:bg-transparent [&_.cm-scroller]:overflow-y-auto"
          extensions={editorExtensions}
          height={CODE_BLOCKS_HEIGHT}
          onChange={setCode}
          theme={editorTheme}
          value={code}
        />
      </div>

      <div className="overflow-hidden rounded-md border bg-card">
        <div className="border-b px-3 py-2 font-medium text-muted-foreground text-xs">
          Console
        </div>
        <pre className="max-h-48 min-h-24 overflow-auto p-3 font-mono text-[13px] leading-relaxed">
          {result && !result.ok && (
            <span className="text-destructive">{result.error}</span>
          )}
          {result?.ok && result.logs.length === 0 && (
            <span className="font-mono text-[13px] text-muted-foreground leading-relaxed">
              {"// no output"}
            </span>
          )}
          {result?.ok &&
            result.logs.map((line, index) => <div key={index}>{line}</div>)}

          {!hasRun && (
            <span className="font-mono text-[13px] text-muted-foreground leading-relaxed">
              {"// click ▶ or (Mod+Shift+Enter) to see output"}
            </span>
          )}
        </pre>
      </div>
    </section>
  );
};

const editorTheme = [
  githubDarkInit({
    settings: {
      background: "transparent",
      gutterBackground: "transparent",
      lineHighlight: "transparent",
    },
  }),
  EditorView.theme({
    ".cm-content": {
      lineHeight: 1.8,
      paddingBottom: "0.5rem",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      paddingTop: "0.5rem",
    },
    ".cm-line": {
      lineHeight: 1.8,
    },
  }),
];

const editorExtensions = [
  javascript(),
  autocompletion(),
  EditorView.lineWrapping,
];
