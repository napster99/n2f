import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

// rollup.config.js
export default {
  input: "src/index.js",
  output: {
    file: "dist/n2f.min.js",
    format: "es",
  },
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    terser({ compress: { drop_console: true } }),
  ],
};
