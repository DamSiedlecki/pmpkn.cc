// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pmpkn.cc",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
    }),
  ],
  image: {
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
