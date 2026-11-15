import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the built app run from any folder, e.g. /apps/studio-booking/ on the platform.
export default defineConfig({ plugins: [react()], base: "./" });
