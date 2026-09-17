import type { BlockComponent, CtaBlockData, FeatureGridBlockData, HeroBlockData, LinkData, RichTextBlockData } from "@laptopclub/foundation-ui";

type RichTextSpan = {
  _type: "span";
  text?: string;
};

type RichTextParagraph = {
  _type: "block";
  children?: RichTextSpan[];
  style?: string;
};

function getText(block: RichTextParagraph): string {
  return (block.children ?? []).map((child) => child.text ?? "").join("");
}

function ActionLink({ className, link }: { className: string; link?: LinkData }) {
  if (!link?.href || !link.label) {
    return null;
  }

  return (
    <a className={className} href={link.href} rel={link.openInNewTab ? "noreferrer" : undefined} target={link.openInNewTab ? "_blank" : undefined}>
      {link.label}
    </a>
  );
}

function sectionId(eyebrow?: string): string | undefined {
  const normalized = eyebrow
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized === "the-framework") {
    return "framework";
  }

  if (normalized === "where-chloe-helps") {
    return "work";
  }

  return normalized;
}

export function EditorialHeroBlock({ block }: { block: HeroBlockData }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-base/15 bg-surface-canvas px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[78vh] max-w-7xl grid-rows-[auto_1fr_auto] rounded-[2rem] border border-ink-base/15 bg-brand-50 p-5 shadow-[0_30px_80px_rgba(37,31,29,0.10)] sm:p-8 lg:p-10">
        <div className="flex items-center justify-between gap-4 border-b border-ink-base/15 pb-5 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
          <span>{block.eyebrow ?? "Operations · Systems · Frameworks"}</span>
          <span>Portfolio / 01</span>
        </div>
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="mb-6 max-w-xl text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Project Management</p>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-ink-base sm:text-7xl lg:text-8xl">
              {block.title ?? "Calm delivery systems for ambitious teams."}
            </h1>
          </div>
          <div className="rounded-[1.75rem] border border-ink-base/15 bg-surface-canvas p-6 sm:p-8">
            {block.body ? <p className="text-lg leading-8 text-ink-muted sm:text-xl">{block.body}</p> : null}
            <ActionLink
              className="mt-8 inline-flex rounded-full bg-ink-base px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-surface-canvas transition hover:bg-brand-600"
              link={block.cta}
            />
          </div>
        </div>
        <div className="grid gap-3 border-t border-ink-base/15 pt-5 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted sm:grid-cols-3">
          <span>Clarity</span>
          <span>Momentum</span>
          <span>Operating rhythm</span>
        </div>
      </div>
    </section>
  );
}

export function EditorialRichTextBlock({ block }: { block: RichTextBlockData }) {
  const content = (block.content ?? []) as RichTextParagraph[];

  return (
    <section className="border-b border-ink-base/15 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.35fr_0.65fr]">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-600">Brief</p>
        <div className="space-y-7">
          {content.map((item, index) => {
            const text = getText(item);

            if (!text) {
              return null;
            }

            if (item.style === "h2") {
              return (
                <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.05em] text-ink-base sm:text-5xl" key={`${text}-${index}`}>
                  {text}
                </h2>
              );
            }

            return (
              <p className="max-w-3xl text-lg leading-8 text-ink-muted sm:text-xl" key={`${text}-${index}`}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EditorialFeatureGridBlock({ block }: { block: FeatureGridBlockData }) {
  const features = block.features ?? [];

  return (
    <section className="border-b border-ink-base/15 px-5 py-20 sm:px-8 lg:px-10" id={sectionId(block.eyebrow)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            {block.eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-600">{block.eyebrow}</p> : null}
            <p className="mt-8 hidden text-8xl font-black leading-none tracking-[-0.08em] text-brand-100 lg:block">{features.length.toString().padStart(2, "0")}</p>
          </div>
          <div>
            <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.05em] text-ink-base sm:text-5xl">
              {block.title ?? "Features"}
            </h2>
            {block.body ? <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">{block.body}</p> : null}
          </div>
        </div>
        {features.length ? (
          <div className="mt-12 grid border-l border-t border-ink-base/15 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <article className="min-h-72 border-b border-r border-ink-base/15 bg-surface-canvas p-6 transition hover:bg-brand-50" key={`${feature.title ?? "feature"}-${index}`}>
                <p className="mb-10 text-xs font-bold uppercase tracking-[0.28em] text-brand-600">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-ink-base">{feature.title ?? "Feature"}</h3>
                {feature.body ? <p className="mt-5 text-sm leading-6 text-ink-muted">{feature.body}</p> : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function EditorialCtaBlock({ block }: { block: CtaBlockData }) {
  return (
    <section className="px-5 py-10 sm:px-8 lg:px-10" id="contact">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink-base p-8 text-surface-canvas sm:p-12 lg:p-16">
        {block.eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-100">{block.eyebrow}</p> : null}
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
          <div>
            <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">{block.title ?? "Ready to get started?"}</h2>
            {block.body ? <p className="mt-6 max-w-2xl text-lg leading-8 text-surface-canvas/75">{block.body}</p> : null}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ActionLink
              className="inline-flex rounded-full bg-surface-canvas px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-ink-base transition hover:bg-brand-100"
              link={block.primaryAction}
            />
            <ActionLink
              className="inline-flex rounded-full border border-surface-canvas/30 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-surface-canvas transition hover:border-surface-canvas"
              link={block.secondaryAction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const editorialBlockRegistryExtension = {
  ctaBlock: EditorialCtaBlock as BlockComponent<never>,
  featureGridBlock: EditorialFeatureGridBlock as BlockComponent<never>,
  heroBlock: EditorialHeroBlock as BlockComponent<never>,
  richTextBlock: EditorialRichTextBlock as BlockComponent<never>
};
