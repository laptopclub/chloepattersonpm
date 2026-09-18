import { GoogleAnalytics } from "@laptopclub/foundation-analytics";
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

function SiteFooter() {
  return (
    <footer className="px-5 py-8 text-sm text-ink-muted sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} Chloe Patterson</p>
        <p>
          Built by{" "}
          <a className="transition hover:text-ink-base" href="#">
            laptopclub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [site, mode] = await Promise.all([getSiteSettings(), draftMode()]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col bg-surface-muted">
          <main className="flex-1">{children}</main>
          <SiteFooter />
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
