// Prefixes root-relative URLs in the built site with BASE_PATH, so the site works
// when served from a subfolder (e.g. GitHub Pages: /cwb-dog-training/).
// Does nothing when BASE_PATH is unset (custom domain at the root).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = (process.env.BASE_PATH ?? '').replace(/\/+$/, '');
if (!base) process.exit(0);

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(p);
		else yield p;
	}
}

let count = 0;
for await (const file of walk(dist)) {
	if (!/\.(html|css)$/.test(file)) continue;
	const src = await readFile(file, 'utf8');
	const out = file.endsWith('.html')
		? // attribute values like href="/about/", src="/images/x.jpg", data-full="/images/x.jpg"
			src.replace(/(\s[a-zA-Z-:]+=)(["'])\/(?!\/)/g, `$1$2${base}/`).replace(/url\((["']?)\/(?!\/)/g, `url($1${base}/`)
		: src.replace(/url\((["']?)\/(?!\/)/g, `url($1${base}/`);
	if (out !== src) {
		await writeFile(file, out);
		count++;
	}
}
console.log(`rebase: prefixed URLs with ${base} in ${count} files`);
