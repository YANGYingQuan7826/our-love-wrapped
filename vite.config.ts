import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/our-love-wrapped/",
  server: {
    host: true,
  },
});
