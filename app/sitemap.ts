import type { MetadataRoute } from "next";

const SITE_URL = "https://kirillotin.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "uz-Cyrl": SITE_URL,
          "uz-Latn": SITE_URL,
        },
      },
    },
  ];
}
