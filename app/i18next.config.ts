import { defineConfig } from 'i18next-cli';

export default defineConfig({
	locales: ['en', 'de'],
	extract: {
		input: 'src/**/*.{js,jsx,ts,tsx}',
		output: 'src/translations/{{language}}.json',
		mergeNamespaces: true,
	},
	plugins: [],
});
