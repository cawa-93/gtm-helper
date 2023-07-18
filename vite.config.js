import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style'
// import * as path from 'node:path'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     lib: {
//       entry: ,
//       name: 'web-ext-test',
//       fileName: 'my-lib',
//       formats: ['es'],
//     },
//     ssr: false,
//     minify: false
//   },
//   define: {
//     'process.env.NODE_ENV': '"production"'
//   },
//   plugins: [vue({
//     customElement: true
//   })],
// })

export default defineConfig({
    plugins: [
        vue({
            customElement: true
        }),
        viteVueCESubStyle(),
        webExtension({
            manifest: {
                name: 'pkg.name',
                description: 'pkg.description',
                version: '0.0.1',
                manifest_version: 3,

                action: {},

                permissions: [
                    "activeTab",
                    "scripting"
                ],

                background: {
                    // scripts: [
                    //   'src/background/index.ts'
                    // ]
                    service_worker: "src/background/index.js",
                },


                // content_scripts: [
                //   {
                //     matches:  ["https://anitube.in.ua/*"],
                //     js: ['./src/anitube.in.ua/content.ts']
                //   }
                // ]

                // web_accessible_resources: [
                //     "src/login.html"
                // ]
            },
            // useDynamicUrlWebAccessibleResources: false,
            additionalInputs: {
                scripts: [
                    'src/content/main.js'
                ]
            }
        }),
    ],
})