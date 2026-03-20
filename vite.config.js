import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// SOLUCIÓN: Usar una función de flecha para poder recibir la variable 'command'
export default defineConfig(({ command }) => {
    return {
        plugins: [react()],
        base: command === 'serve' ? '/' : '/Plataforma-Instituto-Frontend-CPPI/',
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
          @use '@/styles/_animations' as *; `,
                },
            },
        },
        build: {
            cssMinify: 'esbuild',
        },
    };
});