export type DocMeta = {
  title: string;
  description?: string;
  updated?: string;
  order?: number;
};

type DocEntry = {
  slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load: () => Promise<any>;
  meta: DocMeta;
};

const pageModules = import.meta.glob("../content/**/*.mdx");

const metaModules = import.meta.glob("../content/**/*.mdx", {
  eager: true,
  import: "meta",
}) as Record<string, DocMeta>;

function pathToSlug(path: string) {
  return path
    .replace("../content/", "")
    .replace(/\.mdx$/, "")
    .replace(/\/index$/, "");
}

function slugToTitleFallback(slug: string) {
  const last = slug.split("/").pop() || slug;
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const DOCS: DocEntry[] = Object.keys(pageModules)
  .map((path) => {
    const slug = pathToSlug(path);
    const meta = metaModules[path] ?? { title: slugToTitleFallback(slug) };
    return { slug, load: pageModules[path], meta };
  })
  .sort((a, b) => {
    const ao = a.meta.order ?? 1e9;
    const bo = b.meta.order ?? 1e9;
    if (ao !== bo) return ao - bo;
    return a.slug.localeCompare(b.slug);
  });

export function getDoc(slug: string) {
  return DOCS.find((d) => d.slug === slug);
}

export function getRecentWorkshops(limit = 6) {
  return DOCS
    .filter((d) => d.slug.startsWith("workshops/"))
    .slice()
    .sort((a, b) => {
      const ad = a.meta.updated ? Date.parse(a.meta.updated) : 0;
      const bd = b.meta.updated ? Date.parse(b.meta.updated) : 0;
      return bd - ad;
    })
    .slice(0, limit);
}
