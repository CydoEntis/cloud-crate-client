import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"; // ADD THIS IMPORT
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths"; // ADD THIS TOO
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [tsconfigPaths(), TanStackRouterVite({ target: "react", autoCodeSplitting: true }), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync("./localhost+2-key.pem"),
      cert: fs.readFileSync("./localhost+2.pem"),
    },
    port: 5173,
    host: "localhost",
  },
});
