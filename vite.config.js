import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteVueCESubStyle} from '@unplugin-vue-ce/sub-style'
import * as path from 'node:path'

const posixProjectRoot = process.cwd().replaceAll(path.win32.sep, path.posix.sep)

function fileToI18nKey(file) {
    return file.replace(posixProjectRoot + path.posix.sep, '').split('?')[0].replace(/[^a-z0-9_]+/ig, '__')
}

/** @returns { import('vite').PluginOption } */
const vueI18nPlugin = () => {

    let locales = {}

    return {
        name: 'vue-i18n',
        enforce: 'pre',

        resolveId(source, importer) {
            if (source === 'virtual:i18n') {
                return {id: '\0' + importer.split('?')[0] + '?virtual-chrome-i18n'}
            }
        },

        load(id) {
            if (id.endsWith('?virtual-chrome-i18n')) {
                const importer = id.split('?')[0]
                return `export function getMessage(message) { return chrome.i18n.getMessage("${fileToI18nKey(importer.replace('\0', ''))}__"+message) }`
            }
        },


        transform(code, id) {
            if (!/\?vue&type=chrome-i18n&.*lang\.json$/.test(id)) {
                return
            }


            const [_, locale] = id.match(/&locale=([^&]+)&/)

            if (!locale) {
                return
            }

            const messages = JSON.parse(code)


            const fileId = fileToI18nKey(id)
            locales[locale] ||= {}
            locales[locale] = {
                ...locales[locale],
                ...Object.fromEntries(Object.entries(messages).filter(([key]) => !key.startsWith('$')).map(([key, value]) => [fileId + '__' + key, value]))
            }

            return '{}'
        },

        generateBundle() {
            for (const localesKey in locales) {
                this.emitFile({
                    type: 'asset',
                    fileName: `_locales/${localesKey}/messages.json`,
                    source: JSON.stringify(locales[localesKey]),
                })
            }

        }
    }
}

export default defineConfig({
    plugins: [
        vue({
            customElement: true,
            script: {
                defineModel: true
            }
        }),
        vueI18nPlugin(),
        viteVueCESubStyle(),
        webExtension({
            manifest: {
                name: 'pkg.name',
                description: 'pkg.description',
                version: '0.0.1',
                manifest_version: 3,
                default_locale: 'en',
                icons: {
                    "128": "icons/128.png"
                },


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
        }),
    ],
})