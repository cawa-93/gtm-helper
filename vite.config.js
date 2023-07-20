import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteVueCESubStyle} from '@unplugin-vue-ce/sub-style'


export default defineConfig({
    plugins: [vue({
        customElement: true
    }), viteVueCESubStyle(), webExtension({
        manifest: {
            name: 'pkg.name',
            description: 'pkg.description',
            version: '0.0.1',
            manifest_version: 3,

            action: {},

            permissions: ["activeTab", "scripting"],

            background: {
                // scripts: [
                //   'src/background/index.ts'
                // ]
                service_worker: "src/background/index.ts",
            },
        },
        additionalInputs: {
            scripts: ['src/content/main.ts']
        }
    }),],
})