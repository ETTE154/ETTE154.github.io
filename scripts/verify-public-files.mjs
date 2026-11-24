import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

export default function verifyPublicFiles() {
  return {
    name: 'verify-public-files',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const output = fileURLToPath(dir);
        const files = await readdir(output, { recursive: true, withFileTypes: true });

        for (const file of files) {
          const path = join(file.parentPath, file.name);
          const route = relative(output, path).split(/[\\/]/);

          if (route.some((part) => part === '_samples' || part === 'preview')) {
            throw new Error(`Development preview in public output: ${route.join('/')}`);
          }

          if (file.isFile() && /\.(html|css|js|mjs|json|xml|svg|txt)$/i.test(file.name)) {
            const source = await readFile(path, 'utf8');

            if (/\[TODO|&#(?:0*91|x0*5b);TODO|&lbrack;TODO/i.test(source)) {
              throw new Error(`[TODO] text in public output: ${route.join('/')}`);
            }
          }
        }
      },
    },
  };
}
