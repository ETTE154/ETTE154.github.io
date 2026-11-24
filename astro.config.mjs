import { defineConfig } from 'astro/config';
import verifyPublicFiles from './scripts/verify-public-files.mjs';

export default defineConfig({
  site: 'https://ette154.github.io',
  trailingSlash: 'always',
  integrations: [verifyPublicFiles()],
});
