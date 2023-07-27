import webExtension from "@samrum/vite-plugin-web-extension";
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteVueCESubStyle} from '@unplugin-vue-ce/sub-style'
import chromeI18nBlock from 'vite-plugin-vue-chrome-i18n'


export default defineConfig(({mode,}) => {

    /**
     *
     * @type {{
     *     VERSION_REF: string | undefined,
     *     npm_package_version: string | undefined,
     *     BUILD_TARGET: 'chrome' | 'edge' | 'firefox' | undefined
     * }}
     */
    const ENV = loadEnv(mode, process.cwd(), '')

    const supportedBuildTarget = ['chrome', 'edge', 'firefox']

    if (!supportedBuildTarget.includes(ENV.BUILD_TARGET)) {
        throw new Error(`The BUILD_TARGET environment variable is not specified correctly. Valid values are: ${supportedBuildTarget} You have submitted: ${JSON.stringify(ENV.BUILD_TARGET)}`)
    }


    function resolveAppVersion() {
        const {VERSION_REF, npm_package_version} = ENV


        let resolvedVersion = ''

        if (VERSION_REF) {
            const versionFromRef = VERSION_REF.match(/^(?:refs\/tags\/)?v?([0-9]+\.[0-9]+\.[0-9]+)$/)?.[1]
            if (versionFromRef) {
                resolvedVersion = versionFromRef
            } else {
                throw new Error(`Can not resolve version from VERSION_REF. VERSION_REF is ${JSON.stringify(VERSION_REF)} and resolvedVersion is ${resolvedVersion}`)
            }
        } else if (npm_package_version) {
            resolvedVersion = npm_package_version;
        }

        if (!resolvedVersion) {
            throw new Error('Unable to resolve version. You must specify the VERSION_REF environment variable with the semver version or git reference to tag with version or specify the version in the package.json.')
        }

        return resolvedVersion;
    }

    /**
     * @returns {chrome.runtime.Manifest}
     */
    function getManifest() {

        const chromeBackground = {
            service_worker: "src/background/index.ts",
        }

        const firefoxBackground = {
            scripts: [
                'src/background/index.ts'
            ]
        }

        const version = resolveAppVersion()

        return {
            manifest_version: 3,
            name: '__MSG_APP_NAME__',
            description: '__MSG_APP_DESCRIPTION__',
            version,
            default_locale: 'en',
            icons: {
                "128": "icons/128.png"
            },
            action: {},
            permissions: ["activeTab", "scripting"],
            background:
                ENV.BUILD_TARGET === 'firefox' ? firefoxBackground : chromeBackground,
        }
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
                manifest: getManifest(),
                additionalInputs: {
                    scripts: ['src/content/main.ts']
                }
            }),
        ],

    }
})