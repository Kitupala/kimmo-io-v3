import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

/**
 * Generates global metadata for the application from Prismic CMS
 * Fetches homepage document and extracts meta fields for SEO optimization
 *
 * @returns {Promise<Metadata>} Next.js metadata object with SEO tags
 */

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kimmo.io";
  const metadataBase = new URL(siteUrl);
  const isProduction = process.env.NODE_ENV === "production";

  try {
    const client = createClient();
    const home = await client.getSingle("homepage");

    const title = home.data.meta_title ?? "Kimmo Tuupanen ❖ Portfolio";

    const description =
      home.data.meta_description ??
      "Portfolio of Kimmo Tuupanen — a front-end and full-stack developer creating interactive, motion-driven experiences with Next.js, React, GSAP, and Tailwind CSS.";

    const ogImageUrl = asImageSrc(home.data.meta_image) ?? "/default-og.png";

    const ogWidth = home.data.meta_image?.dimensions?.width ?? 1200;

    const ogHeight = home.data.meta_image?.dimensions?.height ?? 630;

    const ogAlt = home.data.meta_image?.alt ?? title;

    return {
      title,
      description,
      metadataBase,

      alternates: {
        canonical: new URL("/", metadataBase),
      },

      openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Kimmo Tuupanen ❖ Portfolio",
        title,
        description,
        images: [
          {
            url: ogImageUrl,
            alt: ogAlt,
            width: ogWidth,
            height: ogHeight,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },

      robots: {
        index: isProduction,
        follow: isProduction,
        googleBot: {
          index: isProduction,
          follow: isProduction,
        },
      },

      icons: { icon: "/favicon.svg" },
    };
  } catch (error) {
    console.error("Failed to fetch metadata from Prismic:", error);

    const fallbackDescription =
      "Portfolio of Kimmo Tuupanen — a front-end and full-stack developer creating interactive, motion-driven experiences with Next.js, React, GSAP, and Tailwind CSS.";

    return {
      title: "Kimmo Tuupanen ❖ Portfolio",
      description: fallbackDescription,
      metadataBase,
      openGraph: {
        type: "website",
        title: "Kimmo Tuupanen ❖ Portfolio",
        description: fallbackDescription,
        images: [
          {
            url: "/default-og.png",
            alt: "Kimmo Tuupanen Portfolio",
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Kimmo Tuupanen ❖ Portfolio",
        description: fallbackDescription,
        images: ["/default-og.png"],
      },
      icons: {
        icon: "/favicon.svg",
      },
    };
  }
}
