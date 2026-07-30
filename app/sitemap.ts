import type { MetadataRoute } from "next";

const siteUrl = "https://jannsenagustin.github.io/resumeops";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects/atlas/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
