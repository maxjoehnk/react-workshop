/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import tanstackRouter from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    oidcSpa(),
  ],
	server: {
		proxy: {
			'/api': 'http://localhost:3001',
		}
	},
	test: {
		globals: true,
		css: false,
		environment: 'jsdom',
		setupFiles: ['./src/vitest-setup.ts'],
	}
})
