import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const text = z.string().trim().min(1);
const url = z.url({ protocol: /^https?$/ });
const month = z.string().regex(/^\d{4}\.(0[1-9]|1[0-2])$/);
const day = z.string().regex(/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/);
const image = z.object({ image: text, alt: text });
const optionalUrl = z.preprocess(
  (value) => value === null || value === '' || value === '[TODO]' ? undefined : value,
  url.optional(),
);
const optionalText = z.preprocess(
  (value) => value === null || value === '' ? undefined : value,
  text.optional(),
);

const profile = defineCollection({
  loader: file('src/content/profile.yaml', {
    parser: (source) => [{ ...parse(source), id: 'profile' }],
  }),
  schema: z.object({
    name_ko: text,
    name_en: text,
    university: text,
    position: text,
    company: text,
    company_role: text,
    statement: text,
    lab: z.object({ name: text, url }),
    links: z.object({
      github: optionalUrl,
      youtube: optionalUrl,
      email: optionalText.pipe(z.email().optional()),
      velog: optionalUrl,
    }),
    verification: z.object({ naver: optionalText, google: optionalText }).optional(),
    photo: image,
    intro: optionalText,
    description: text,
  }),
});

const news = defineCollection({
  loader: file('src/content/news.yaml', {
    parser: (source) => [{ id: 'feed', items: parse(source) }],
  }),
  schema: z.object({
    items: z.array(z.object({ date: month, text, link: url.nullish() })),
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.yaml', { parser: parse }),
  schema: z.object({
    period_start: month,
    period_end: month.nullish(),
    date_detail: day.nullish(),
    org: text,
    role: text,
    url: url.nullish(),
    type: z.enum(['position', 'education']),
  }).refine(
    (item) => !item.period_end || item.period_end >= item.period_start,
    { path: ['period_end'], message: 'period_end must follow period_start' },
  ).refine(
    (item) => !item.date_detail || item.date_detail.startsWith(item.period_start),
    { path: ['date_detail'], message: 'date_detail must match period_start' },
  ),
});

const projects = defineCollection({
  loader: glob({ base: 'src/content/projects', pattern: '*.md' }),
  schema: z.object({
    title: text,
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    period: month,
    summary: text,
    thumbnail: image.optional(),
    video: text.optional(),
    links: z.object({
      paper: url.optional(),
      video: url.optional(),
      code: url.optional(),
      slides: url.optional(),
    }).optional(),
    team: z.array(z.object({ name: text, affiliation: text.optional() })).optional(),
    public: z.boolean(),
    has_detail: z.boolean(),
    role: text.optional(),
    overview: text.optional(),
    system: z.array(z.object({ label: text, value: text })).optional(),
    results: z.array(image.extend({ caption: text })).optional(),
    bibtex: text.optional(),
    acknowledgment: text.optional(),
    hero: z.object({ image: image.optional(), video: text.optional(), captions: text.optional() }).optional(),
  }).refine(
    (item) => !item.has_detail || Boolean(item.role && item.overview),
    { path: ['has_detail'], message: 'Project details require role and overview' },
  ),
});

export const collections = { profile, news, experience, projects };
