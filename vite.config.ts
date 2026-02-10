import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
      }),
    }, // must run before react(), don't move pls
    react({ include: /\.(mdx|md|jsx|js|tsx|ts)$/ }),

  ],
});
