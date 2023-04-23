import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@/fcuntions': path.resolve(__dirname, 'fcuntions'),

            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@/types': path.resolve(__dirname, 'src/types'),
            '@/assets': path.resolve(__dirname, 'src/assets'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/configs': path.resolve(__dirname, 'src/configs'),
            '@/stores': path.resolve(__dirname, 'src/stores')
        }
    }
})
