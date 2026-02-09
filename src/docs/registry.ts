export type DocNode = {
  type: "doc";
  title: string;
  slug: string;
  description?: string;
};

export type CategoryNode = {
  type: "category";
  name: string;
  items: (DocNode | CategoryNode)[];
};

export type DocEntry = {
  slug: string;
  meta: { title: string; description?: string };
  load: () => Promise<never>;
};

const modules = import.meta.glob("../content/**/*.mdx");

function getSlug(path: string) {
  return path
    .replace(/^\.\.\/content\//, "")
    .replace(/\.mdx$/, "");
}

function formatTitle(raw: string) {
  return raw
    .replace(/^\d+-/, "") 
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const ALL_DOCS: DocEntry[] = [];
export const SIDEBAR_TREE: (DocNode | CategoryNode)[] = [];

for (const path in modules) {
  const slug = getSlug(path);
  const parts = slug.split("/");
  const filename = parts.pop()!;

  const entry: DocEntry = {
    slug,
    meta: {
      title: formatTitle(filename),
      description: "", 
    },
    load: modules[path] as never,
  };
  ALL_DOCS.push(entry);

  let currentLevel = SIDEBAR_TREE;
  parts.forEach((folder) => {
    let existingFolder = currentLevel.find(
      (n) => n.type === "category" && n.name === formatTitle(folder)
    ) as CategoryNode;

    if (!existingFolder) {
      existingFolder = {
        type: "category",
        name: formatTitle(folder),
        items: [],
      };
      currentLevel.push(existingFolder);
    }
    currentLevel = existingFolder.items;
  });

  currentLevel.push({
    type: "doc",
    title: formatTitle(filename),
    slug,
  });
}

ALL_DOCS.sort((a, b) => a.slug.localeCompare(b.slug));

export function getDoc(slug: string) {
  return ALL_DOCS.find((d) => d.slug === slug);
}

export function getRecentWorkshops() {
  let workshops = ALL_DOCS.filter((doc) => 
    doc.slug.toLowerCase().includes("workshop")
  );

  if (workshops.length === 0) {
    workshops = ALL_DOCS;
  }

  return workshops.slice(0, 3);
}

export const DOCS = ALL_DOCS;
