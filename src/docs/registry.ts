export type DocNode = {
  type: 'doc';
  title: string;
  slug: string;
  description?: string;
  order?: number;
};

export type CategoryNode = {
  type: 'category';
  name: string;
  items: (DocNode | CategoryNode)[];
};

export type DocEntry = {
  slug: string;
  meta: {
    title: string;
    description?: string;
    updated?: string;
    order?: number;
  };
  load: () => Promise<never>;
};

const CATEGORY_ORDER = [
  'ACM Development',
  'Workshops',
  'Tools',
];

const modules = import.meta.glob('../content/**/*.mdx');

type MdxMeta = {
  title?: string;
  description?: string;
  updated?: string;
  order?: number;
};
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

function getWeight(node: DocNode | CategoryNode) {
  if (node.type === 'category') {
    const idx = CATEGORY_ORDER.indexOf(node.name);
    return idx !== -1 ? idx : 999;
  }
  return node.order ?? 999;
}

function sortTree(nodes: (DocNode | CategoryNode)[]) {
  nodes.sort((a, b) => {
    const weightA = getWeight(a);
    const weightB = getWeight(b);
    if (weightA !== weightB) return weightA - weightB;

    const nameA = a.type === 'doc' ? a.title : a.name;
    const nameB = b.type === 'doc' ? b.title : b.name;
    return nameA.localeCompare(nameB);
  });

  nodes.forEach((node) => {
    if (node.type === 'category') {
      sortTree(node.items);
    }
  });
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
      order: fm?.order,
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
    order: entry.meta.order,
  });
}

sortTree(SIDEBAR_TREE);
const orderedSlugs: string[] = [];
function collectSlugs(nodes: (DocNode | CategoryNode)[]) {
  for (const node of nodes) {
    if (node.type === 'doc') {
      orderedSlugs.push(node.slug);
    } else {
      collectSlugs(node.items);
    }
  }
}
collectSlugs(SIDEBAR_TREE);
ALL_DOCS.sort((a, b) => {
  const ai = orderedSlugs.indexOf(a.slug);
  const bi = orderedSlugs.indexOf(b.slug);
  return ai - bi;
});

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
