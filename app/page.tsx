import { pageBySlugQuery } from "@laptopclub/foundation-cms/queries";
import { BlockRenderer, type PageBlock } from "@laptopclub/foundation-ui";
import type { Metadata } from "next";
import type { PageBySlugQueryResult } from "../lib/sanity-query-types";
import { AboutChloeCard } from "../components/editorial-blocks";
import { siteBlockRegistry } from "../lib/blocks";
import { env } from "../lib/env";
import { sanityFetch } from "../lib/live";
import { getSiteSettings } from "../lib/site";

type PageData = NonNullable<PageBySlugQueryResult>;

const fallbackBlocks: PageBlock[] = [
  {
    _type: "heroBlock",
    eyebrow: "Foundation",
    title: "A reusable launchpad for client websites",
    body: "Next.js, Sanity, Tailwind, analytics and deployment conventions in one maintainable framework.",
    cta: { label: "Start building", href: "/studio" }
  }
];

async function getHomePage({ stega = true }: { stega?: boolean } = {}): Promise<PageData | null> {
  if (!env.sanity.projectId) {
    return null;
  }

  const { data } = await sanityFetch({ params: { slug: "home" }, query: pageBySlugQuery, stega });
  return data as PageBySlugQueryResult;
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getHomePage({ stega: false }), getSiteSettings({ stega: false })]);

  return {
    description: page?.seo?.description ?? site.description,
    robots: page?.seo?.noIndex ? { follow: false, index: false } : undefined,
    title: page?.seo?.title ?? page?.title ?? site.title
  };
}

export default async function HomePage() {
  const page = await getHomePage();
  const imageConfig = { dataset: env.sanity.dataset, projectId: env.sanity.projectId };

  const blocks = page?.blocks?.length ? (page.blocks as PageBlock[]) : fallbackBlocks;
  const [firstBlock, ...remainingBlocks] = blocks;

  return (
    <>
      {firstBlock ? <BlockRenderer blocks={[firstBlock]} imageConfig={imageConfig} registry={siteBlockRegistry} /> : null}
      <AboutChloeCard />
      {remainingBlocks.length ? <BlockRenderer blocks={remainingBlocks} imageConfig={imageConfig} registry={siteBlockRegistry} /> : null}
    </>
  );
}
