import { GoogleAnalytics } from "@laptopclub/foundation-analytics";
import { SiteFooter } from "@laptopclub/foundation-ui";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "../components/disable-draft-mode";
import { env } from "../lib/env";
import { SanityLive } from "../lib/live";
import { getSiteSettings } from "../lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings({ stega: false });

  return {
    description: site.description,
    metadataBase: new URL(env.siteUrl),
    title: {
      default: site.title,
      template: `%s | ${site.title}`
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [site, mode] = await Promise.all([getSiteSettings(), draftMode()]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter site={site} />
        </div>
        <SanityLive />
        {mode.isEnabled ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
        <GoogleAnalytics measurementId={env.gaMeasurementId} />
      </body>
    </html>
  );
}
