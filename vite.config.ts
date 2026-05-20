import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(
    fileURLToPath(import.meta.url)
);

export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/styles/_variables.scss" as *;
                    @use "@/styles/_animations.scss" as *;
                `,
            },
        },
    },
    build: {
        cssMinify: 'esbuild',
    },
});