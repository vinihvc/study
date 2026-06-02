import { prepareExerciseCode } from "@/lib/transpile";

export type ConsoleRunResult =
  | { ok: true; logs: string[] }
  | { ok: false; error: string };

type WorkerResponse =
  | { ok: true; logs: string[] }
  | { ok: false; error: string };

const createWorker = () =>
  new Worker(new URL("code-runner.worker.ts", import.meta.url), {
    type: "module",
  });

export const runExerciseCode = async (
  sourceCode: string
): Promise<ConsoleRunResult> => {
  let js: string;

  try {
    js = await prepareExerciseCode(sourceCode);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to parse code",
      ok: false,
    };
  }

  const worker = createWorker();

  return new Promise((resolve) => {
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      worker.terminate();
      resolve(event.data);
    };

    worker.onerror = (error) => {
      worker.terminate();
      resolve({ error: error.message, ok: false });
    };

    worker.postMessage({ code: js });
  });
};
