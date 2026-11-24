import type { ImageMetadata } from 'astro';

const originals = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/**/*.{avif,jpeg,jpg,png,webp}',
  { eager: true },
);

export function resolveImage(path: string): ImageMetadata {
  const image = originals[`../assets/images/${path}`];

  if (!image) {
    throw new Error(`Image file missing from src/assets/images: ${path}`);
  }

  return image.default;
}
