import type { PageBlock } from "@laptopclub/foundation-ui";

export type PageBySlugQueryResult = {
  _id: string;
  _type: "page";
  title?: string | null;
  slug?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    noIndex?: boolean | null;
  } | null;
  blocks?: PageBlock[] | null;
} | null;

export type AllPageSlugsQueryResult = Array<{
  slug?: string | null;
}>;

export type SiteSettingsQueryResult = {
  title?: string | null;
  description?: string | null;
  logoText?: string | null;
  primaryNavigation?: NavigationQueryResult[] | null;
  footerNavigation?: NavigationQueryResult[] | null;
} | null;

type NavigationQueryResult = {
  href?: string | null;
  label?: string | null;
  openInNewTab?: boolean | null;
};
