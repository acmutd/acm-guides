export type DocMeta = { title?: string; description?: string };

export type DocEntry = {
  slug: string;
  meta: { title: string; description?: string };
  load: () => Promise<never>;
};

const modules = import.meta.glob("../content/**/*.mdx"); // lazy component
const metas = import.meta.glob("../content/**/*.mdx", {
  eager: true,
  import: "meta",
}) as Record<string, DocMeta | undefined>; // eager named export only [page:1]

function getSlug(path: string) {
  return path.replace(/^\.\.\/content\//, "").replace(/\.mdx$/, "");
}

function formatTitle(raw: string) {
  return raw
    .replace(/^\d+-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const ALL_DOCS: DocEntry[] = [];
// @ts-expect-error lame
export const SIDEBAR_TREE: (DocNode | CategoryNode)[] = [];

for (const path in modules) {
  const slug = getSlug(path);
  const parts = slug.split("/");
  const filename = parts.pop()!;

  const fm = metas[path];
  
  const entry: DocEntry = {
    slug,
    meta: {
      title: fm?.title ?? formatTitle(filename),
      description: fm?.description,
    },
    load: modules[path] as never,
  };

  ALL_DOCS.push(entry);

  let currentLevel = SIDEBAR_TREE;
  parts.forEach((folder) => {
    let existingFolder = currentLevel.find(
      (n) => n.type === "category" && n.name === formatTitle(folder)
    // @ts-expect-error not a clue
    ) as CategoryNode;

    if (!existingFolder) {
      existingFolder = { type: "category", name: formatTitle(folder), items: [] };
      currentLevel.push(existingFolder);
    }
    currentLevel = existingFolder.items;
  });

  currentLevel.push({
    type: "doc",
    title: entry.meta.title,
    slug,
    description: entry.meta.description,
  });
}

ALL_DOCS.sort((a, b) => a.slug.localeCompare(b.slug));
export const DOCS = ALL_DOCS;
