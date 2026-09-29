import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agape Tech",
    short_name: "Agape Tech",
    description: "Technology with Purpose. Engineering confidence into every digital experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111F",
    theme_color: "#07111F",
    icons: [
      {
        src: "/assets/brand/agape-tech-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/brand/agape-tech-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
