import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx() }, // must run before react(), don't move pls
    react({ include: /\.(mdx|md|jsx|js|tsx|ts)$/ }),
  ],
});
