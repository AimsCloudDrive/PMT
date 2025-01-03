import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 导入转换require的包
import requireTransform from "vite-plugin-require-transform";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
      babel: {
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [
          [
            "@babel/plugin-transform-typescript",
            {
              allowDeclareFields: true,
            },
          ],
          [
            "@babel/plugin-proposal-decorators",
            // version: 'legacy', '2023-11', '2023-05', '2023-01', '2022-03', or '2021-12'
            { version: "legacy" },
          ],
        ],
        babelrc: false,
      },
    }),
    requireTransform({
      // 匹配规则
      fileRegex: /.ts$|.tsx$/,
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
  },
});
