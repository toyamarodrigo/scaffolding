import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/modules": path.resolve(__dirname, "./src/modules"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: 3000,
    cors: true,
  },
  preview: {
    port: 3001,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
