import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "./lib/index.js"
    },
    {
      format: "cjs",
      file: "./lib/index.min.js",
      plugins: [terser()]
    },
    {
      format: "es",
      file: "./lib/index.mjs"
    }
  ],
  plugins: [typescript()],
  external: ["react", "mysql", "cli-highlight", "ink", "ink-table", "ink-text-input"]
};
