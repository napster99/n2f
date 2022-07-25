import { terser } from "rollup-plugin-terser";

// rollup.config.js
export default {
  input: "src/index.js",
  output: {
    file: "dist/n2f.min.js",
    format: "es",
  },
  plugins: [terser({ compress: { drop_console: true } })],
};
