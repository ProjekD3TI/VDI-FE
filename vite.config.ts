import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "exclude-config-js",
      closeBundle() {
        const file = path.resolve(__dirname, "dist/config.js");

        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
