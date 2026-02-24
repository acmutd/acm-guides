export type DocNode = {
  type: 'doc';
  title: string;
  slug: string;
  description?: string;
};

export type CategoryNode = {
  type: 'category';
  name: string;
  items: (DocNode | CategoryNode)[];
};

export type DocEntry = {
  slug: string;
  meta: { title: string; description?: string; updated?: string };
  load: () => Promise<never>;
};

const modules = import.meta.glob('../content/**/*.mdx');

type MdxMeta = { title?: string; description?: string; updated?: string };
const metas = import.meta.glob('../content/**/*.mdx', {
  eager: true,
  import: 'meta',
}) as Record<string, MdxMeta | undefined>;

function getSlug(path: string) {
  return path.replace(/^\.\.\/content\//, '').replace(/\.mdx$/, '');
}

function formatTitle(raw: string) {
  return raw
    .replace(/^\d+-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const ALL_DOCS: DocEntry[] = [];
export const SIDEBAR_TREE: (DocNode | CategoryNode)[] = [];

for (const path in modules) {
  const slug = getSlug(path);
  const parts = slug.split('/');
  const filename = parts.pop()!;

  const fm = metas[path];

  const entry: DocEntry = {
    slug,
    meta: {
      title: fm?.title ?? formatTitle(filename),
      description: fm?.description,
      updated: fm?.updated,
    },
    load: modules[path] as never,
  };

  ALL_DOCS.push(entry);

  let currentLevel = SIDEBAR_TREE;
  parts.forEach((folder) => {
    let existingFolder = currentLevel.find(
      (n) => n.type === 'category' && n.name === formatTitle(folder)
    ) as CategoryNode;

    if (!existingFolder) {
      existingFolder = {
        type: 'category',
        name: formatTitle(folder),
        items: [],
      };
      currentLevel.push(existingFolder);
    }
    currentLevel = existingFolder.items;
  });

  currentLevel.push({
    type: 'doc',
    title: entry.meta.title,
    slug,
    description: entry.meta.description,
  });
}

ALL_DOCS.sort((a, b) => a.slug.localeCompare(b.slug));

export function getDoc(slug: string) {
  return ALL_DOCS.find((d) => d.slug === slug);
}

function updatedKey(doc: DocEntry) {
  return doc.meta.updated ?? '';
}

export function getRecentWorkshops(count = 3) {
  let workshops = ALL_DOCS;
  if (workshops.length === 0) workshops = ALL_DOCS;

  return workshops
    .slice()
    .sort((a, b) => updatedKey(b).localeCompare(updatedKey(a)))
    .slice(0, count);
}

export const DOCS = ALL_DOCS;
