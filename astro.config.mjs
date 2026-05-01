// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://pmpkn.cc",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      lastmod: new Date("2022-02-24"),
    }),
  ],
  image: {
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
