import Script from "next/script";

const cloudflareBeaconToken = "7e833472d286456e97e3719df7e904e5";

export default function CloudflareAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      id="cloudflare-web-analytics"
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: cloudflareBeaconToken })}
    />
  );
}
