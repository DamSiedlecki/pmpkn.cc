import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const response = next();

  return response.then((res) => {
    const url = context.url.pathname;

    // Assets z hashem (_astro/) mogą być cachowane na bardzo długo
    if (url.startsWith("/_astro/")) {
      res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    // HTML strony - krótszy cache
    else if (url.endsWith(".html") || url === "/") {
      res.headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }
    // Inne zasoby
    else {
      res.headers.set("Cache-Control", "public, max-age=86400");
    }

    return res;
  });
});
