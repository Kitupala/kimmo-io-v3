import Script from "next/script";

export const UmamiAnalytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!websiteId) {
    return null;
  }

  return (
    <Script
      async
      src="/stats/script.js"
      data-website-id={websiteId}
      data-host-url={siteUrl}
      strategy="afterInteractive"
    />
  );
};
