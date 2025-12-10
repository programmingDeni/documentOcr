import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    watch: {
      usePolling: true, // Wichtig für Docker auf Windows!
    },
  },
  plugins: [react()],
});
