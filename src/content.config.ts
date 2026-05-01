import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      "szosa",
      "gravel",
      "mtb",
      "serwis",
      "porady",
      "relacje",
      "inne",
      "sprzęt",
      "wyprawy",
      "testy",
      "sponsor",
      "aktualności",
    ]),
    image: image().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: reference("authors"),
  }),
});

const trip = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/trasy" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    stravaUrl: z.string().optional(),
    garminUrl: z.string().optional(),
    gpx: z.boolean().default(false),
    draft: z.boolean().default(false),
    author: reference("authors"),
    image: image().optional(),
  }),
});

const localization = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/localization" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    country: z.string(),
    lat: z.number(),
    lng: z.number(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    image: image().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      avatar: image().optional(),
    }),
});

export const collections = { blog, authors, trip };
