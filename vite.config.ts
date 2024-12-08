import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
      babel: {
        targets: ["defaults"],
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [
          ["@babel/plugin-syntax-decorators", { decoratorsBeforeExport: true }],
          // ["@babel/plugin-proposal-decorators", { version: "legacy" }],
        ],
        babelrc: false,
      },
    }),
  ],
});
