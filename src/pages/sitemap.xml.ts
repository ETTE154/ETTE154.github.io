import type { APIRoute } from 'astro';
import { getPublicProjects, projectPath } from '../lib/projects';

export const GET: APIRoute = async ({ site }) => {
  const projects = await getPublicProjects();
  const pages = ['/', ...projects.filter(({ has_detail }) => has_detail).map(({ slug }) => projectPath(slug))];
  const entries = pages.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
