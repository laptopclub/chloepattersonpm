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

function SectionFrame({ children, className = "", fullHeight = false, id }: { children: React.ReactNode; className?: string; fullHeight?: boolean; id?: string }) {
  const backgroundClass = className.includes("bg-") ? "" : "bg-surface-canvas";
  const sectionClassName = fullHeight ? "flex p-3 sm:min-h-screen sm:p-4 lg:p-6" : "p-3 sm:p-4 lg:p-6";

  return (
    <section className={sectionClassName} id={id}>
      <div className={`mx-auto max-w-[112rem] flex-1 overflow-hidden rounded-2xl ${backgroundClass} ${className}`}>{children}</div>
    </section>
  );
}

export function EditorialHeroBlock({ block }: { block: HeroBlockData }) {
  return (
    <SectionFrame className="p-5 sm:p-8 lg:p-10" fullHeight>
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center py-12 text-center sm:py-14 lg:py-16">
        <h1 className="text-5xl leading-[0.84] tracking-[-0.07em] text-ink-base sm:text-7xl lg:text-9xl">
          <span className="block font-serif italic tracking-[-0.05em]">Chloe</span>
          <span className="block font-black uppercase">Patterson</span>
        </h1>
        <div className="mt-8 max-w-3xl border-t border-ink-base/15 pt-7 sm:mt-10 lg:mt-12">
          <p className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-ink-base sm:text-3xl lg:text-4xl">Project Management</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-brand-600 sm:text-sm">Operations - systems - frameworks</p>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-ink-muted sm:text-xl">Streamlining delivery and building scalable workflows.</p>
        </div>
      </div>
    </SectionFrame>
  );
}

export function EditorialRichTextBlock({ block }: { block: RichTextBlockData }) {
  const content = (block.content ?? []) as RichTextParagraph[];

  return (
    <SectionFrame className="px-5 py-20 sm:px-8 lg:px-10">
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
    </SectionFrame>
  );
}

export function EditorialFeatureGridBlock({ block }: { block: FeatureGridBlockData }) {
  const features = block.features ?? [];

  return (
    <SectionFrame className="px-5 py-20 sm:px-8 lg:px-10" id={sectionId(block.eyebrow)}>
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
          <div className="mt-12 grid overflow-hidden rounded-xl border border-ink-base/15 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <article className="min-h-72 border-b border-r border-ink-base/15 bg-white/40 p-6 transition hover:bg-brand-50" key={`${feature.title ?? "feature"}-${index}`}>
                <p className="mb-10 text-xs font-bold uppercase tracking-[0.28em] text-brand-600">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-ink-base">{feature.title ?? "Feature"}</h3>
                {feature.body ? <p className="mt-5 text-sm leading-6 text-ink-muted">{feature.body}</p> : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </SectionFrame>
  );
}

export function EditorialCtaBlock({ block }: { block: CtaBlockData }) {
  return (
    <SectionFrame className="bg-brand-600 p-8 text-surface-canvas sm:p-12 lg:p-16" id="contact">
      <div className="mx-auto max-w-7xl">
        {block.eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-50">{block.eyebrow}</p> : null}
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
          <div>
            <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl">{block.title ?? "Ready to get started?"}</h2>
            {block.body ? <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-50">{block.body}</p> : null}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ActionLink
              className="inline-flex rounded-full bg-surface-canvas px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-900 transition hover:bg-brand-50"
              link={block.primaryAction}
            />
            <ActionLink
              className="inline-flex rounded-full border border-brand-50 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-surface-canvas transition hover:bg-brand-50 hover:text-brand-900"
              link={block.secondaryAction}
            />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

export const editorialBlockRegistryExtension = {
  ctaBlock: EditorialCtaBlock as BlockComponent<never>,
  featureGridBlock: EditorialFeatureGridBlock as BlockComponent<never>,
  heroBlock: EditorialHeroBlock as BlockComponent<never>,
  richTextBlock: EditorialRichTextBlock as BlockComponent<never>
};
