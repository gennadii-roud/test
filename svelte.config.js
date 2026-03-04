import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const SPA_MODE = process.env.SPA_MODE === 'true';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: SPA_MODE ? 'index.html' : null,
			precompress: false,
			strict: true
		}),
		paths: {
			relative: false
		},
		prerender: {
			crawl: false,
			handleMissingId: () => {
				return;
			}
		}
	}
};

export default config;
