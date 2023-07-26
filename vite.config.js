import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteVueCESubStyle} from '@unplugin-vue-ce/sub-style'
import chromeI18nBlock from 'vite-plugin-vue-chrome-i18n'

/**
 * @param {'chrome' | 'edge' | 'firefox'} target
 * @returns {chrome.runtime.Manifest}
 */
function getManifest(target) {

    const chromeBackground = {
        service_worker: "src/background/index.ts",
    }

    const firefoxBackground = {
        scripts: [
            'src/background/index.ts'
        ]
    }

    return {
        name: '__MSG_APP_NAME__',
        description: '__MSG_APP_DESCRIPTION__',
        version: process.env.npm_package_version,
        manifest_version: 3,
        default_locale: 'en',
        icons: {
            "128": "icons/128.png"
        },


        action: {},

        permissions: ["activeTab", "scripting"],

        background: target === 'firefox' ? firefoxBackground : chromeBackground,
    }
}

export default defineConfig(({mode,}) => {


    const {BUILD_TARGET, npm_package_version} = loadEnv(mode, process.cwd(), '')
    const supportedBuildTarget = ['chrome', 'edge', 'firefox']

    if (!supportedBuildTarget.includes(BUILD_TARGET)) {
        throw new Error(`The BUILD_TARGET environment variable is not specified correctly. Valid values are: ${supportedBuildTarget} You have submitted: ${JSON.stringify(BUILD_TARGET)}`)
    }

    return {
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
                manifest: getManifest(BUILD_TARGET),
                additionalInputs: {
                    scripts: ['src/content/main.ts']
                }
            }),
        ],

    }
})