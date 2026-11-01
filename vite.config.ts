import { mdsvex } from 'mdsvex';

import adapter from '@sveltejs/adapter-node';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: [mdsvex()],
			extensions: ['.svelte', '.svx'],
			adapter: adapter()
		})
	]
});
