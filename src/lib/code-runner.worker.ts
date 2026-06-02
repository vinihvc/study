const EXECUTION_TIMEOUT_MS = 5000;

interface WorkerRequest {
  code: string;
}

type WorkerResponse =
  | { ok: true; logs: string[] }
  | { ok: false; error: string };

const formatArg = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const createConsole = (logs: string[]) => ({
  error: (...args: unknown[]) => {
    logs.push(args.map(formatArg).join(" "));
  },
  info: (...args: unknown[]) => {
    logs.push(args.map(formatArg).join(" "));
  },
  log: (...args: unknown[]) => {
    logs.push(args.map(formatArg).join(" "));
  },
  warn: (...args: unknown[]) => {
    logs.push(args.map(formatArg).join(" "));
  },
});

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { code } = event.data;
  const logs: string[] = [];

  try {
    const runner = new Function(
      "console",
      `
      return (async () => {
        ${code}
      })();
    `
    ) as (console: ReturnType<typeof createConsole>) => Promise<unknown>;

    await Promise.race([
      runner(createConsole(logs)),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("Execution timed out after 5 seconds")),
          EXECUTION_TIMEOUT_MS
        );
      }),
    ]);

    const response: WorkerResponse = { logs, ok: true };
    self.postMessage(response);
  } catch (error) {
    const response: WorkerResponse = {
      error: error instanceof Error ? error.message : "Failed to run code",
      ok: false,
    };
    self.postMessage(response);
  }
};
