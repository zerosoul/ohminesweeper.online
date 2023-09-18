import { Pages } from "@/config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Pages.map((page) => {
    // eslint-disable-next-line no-unused-vars
    const { title, ...rest } = page;
    return rest;
  });
  return pages;
}
