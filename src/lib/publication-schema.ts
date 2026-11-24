import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const link = z.union([
  z.url({ protocol: /^https?$/ }),
  z.string().regex(/^(?:\/(?!\/)|#)[^\s\\]*$/u),
]);

export const publicationSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
  title: text,
  authors: z.array(text).min(1),
  venue: text,
  year: z.number().int().min(1000).max(9999),
  group: z.enum(['international', 'domestic', 'conference']),
  status: z.enum(['published', 'accepted']),
  selected: z.boolean().optional(),
  thumbnail: z.object({ image: text, alt: text }).optional(),
  video: link.optional(),
  links: z.object({
    pdf: link.optional(),
    code: link.optional(),
    video: link.optional(),
    project: link.optional(),
  }).optional(),
  bibtex: text.optional(),
});

export type Publication = z.infer<typeof publicationSchema>;
