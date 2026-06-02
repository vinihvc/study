import * as esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";

let initialized = false;

const initEsbuild = async () => {
  if (initialized) {
    return;
  }

  await esbuild.initialize({ wasmURL });
  initialized = true;
};

export const prepareExerciseCode = async (code: string) => {
  await initEsbuild();

  const { code: js } = await esbuild.transform(code, {
    loader: "js",
    target: "es2020",
  });

  return js;
};
