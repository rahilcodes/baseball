import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bplbaseball.com";
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/teams", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/players", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/schedule", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/standings", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/rules", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/register", priority: 0.95, changeFrequency: "monthly" as const },
    { url: "/register/team", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/register/free-agent", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/sponsorship", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/safety", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/media", priority: 0.65, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
