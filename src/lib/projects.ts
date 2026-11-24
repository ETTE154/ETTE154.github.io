import { getCollection } from 'astro:content';

export async function getPublicProjects() {
  const entries = await getCollection('projects', ({ data }) => data.public);
  const projects = entries.map(({ data }) => data);
  const slugs = new Set(projects.map(({ slug }) => slug));

  if (slugs.size !== projects.length) {
    throw new Error('Public projects must have unique slugs.');
  }

  return projects.sort((a, b) => b.period.localeCompare(a.period));
}

export function projectPath(slug: string) {
  return `/projects/${slug}/`;
}
