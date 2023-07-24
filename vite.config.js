import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteVueCESubStyle} from '@unplugin-vue-ce/sub-style'
import chromeI18nBlock from 'vite-plugin-vue-chrome-i18n'

// import * as path from 'node:path'

// const posixProjectRoot = process.cwd().replaceAll(path.win32.sep, path.posix.sep)

// function fileToI18nKey(file) {
//     return file.replace(posixProjectRoot + path.posix.sep, '').split('?')[0].replace(/[^a-z0-9_]+/ig, '__')
// }

/**
 *
 * @param {{en: Record<string, {message: string}>, uk: Record<string, {message: string}>}} initialLocales
 * @returns { import('vite').PluginOption }
 */
// const chromeI18nBlock = ({initialLocales = {}} = {}) => {
//
//     let idToMessagesMap = new Map()
//
//     return {
//         name: 'vue-i18n',
//         enforce: 'pre',
//
//         resolveId(source, importer) {
//             if (source === 'virtual:i18n') {
//                 return {id: '\0' + importer.split('?')[0] + '?virtual-chrome-i18n'}
//             }
//         },
//
//         load(id) {
//             if (id.endsWith('?virtual-chrome-i18n')) {
//                 const importer = id.split('?')[0]
//                 return `export function getMessage(message) { return chrome.i18n.getMessage("${fileToI18nKey(importer.replace('\0', ''))}__"+message) }`
//             }
//         },
//
//
//         transform(code, id) {
//             if (!/\?vue&type=chrome-i18n&.*lang\.json$/.test(id) || !/&locale=([^&]+)&/.test(id)) {
//                 return
//             }
//
//             const messages = JSON.parse(code)
//
//             idToMessagesMap.set(id, messages)
//
//             return '{}'
//         },
//
//         generateBundle() {
//             const locales = initialLocales || {}
//             for (const [id, messages] of idToMessagesMap) {
//                 const [_, locale] = id.match(/&locale=([^&]+)&/)
//                 const messagePrefix = fileToI18nKey(id)
//                 const scopedMessages = Object.fromEntries(
//                     Object
//                         .entries(messages)
//                         .filter(([k]) => !k.startsWith('$'))
//                         .map(([key, v]) => [`${messagePrefix}__${key}`, v])
//                 )
//                 locales[locale] = {
//                     ...(locales[locale] || {}),
//                     ...scopedMessages
//                 }
//             }
//
//             for (const localesKey in locales) {
//                 this.emitFile({
//                     type: 'asset',
//                     fileName: `_locales/${localesKey}/messages.json`,
//                     source: JSON.stringify(locales[localesKey]),
//                 })
//             }
//
//         }
//     }
// }

export default defineConfig({
    plugins: [
        vue({
            customElement: true,
            script: {
                defineModel: true
            }
        }),
        chromeI18nBlock({
            initialLocales: {
                en: {
                    'APP_NAME': {
                        message: 'GTM Helper'
                    },
                    'APP_DESCRIPTION': {
                        message: 'Allows you to easily select an element on any webpage and get suggestions for GTM triggers targeting the selected element.'
                    }
                },
                uk: {
                    'APP_NAME': {
                        message: 'GTM помічник'
                    },
                    'APP_DESCRIPTION': {
                        message: 'Дозволяє легко обрати елемент на будь-якій вебсторінці та отримати пропозиції тригерів для GTM націлені на обраний елемент.'
                    }
                }
            }
        }),
        viteVueCESubStyle(),
        webExtension({
            manifest: {
                name: '__MSG_APP_NAME__',
                description: '__MSG_APP_DESCRIPTION__',
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