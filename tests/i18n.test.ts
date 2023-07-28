import {expect, test} from "@playwright/test";

const localeCodes = ['uk', 'en'] as const

const locales = await Promise.all(localeCodes.map(async code => ({
    code,
    messages: (await import(`../dist/_locales/${code}/messages.json`, {assert: {type: 'json'}})).default
})))

test('All keys in all localizations must be the same', () => {
    const expectedKeys = Object.keys(locales[0].messages)
    for (let i = 1; i < locales.length; i++) {
        expect(Object.keys(locales[i].messages), `Locale "${locales[i].code}" doesn't match locale "${locales[0].code}"`).toEqual(expectedKeys)
    }
})


test.only('Messages do not have to have the same values in different locales', () => {

    const messagesMap: Record<string, { code: typeof localeCodes[number], value: string }[]> = {}

    for (const {code, messages} of locales) {
        for (const messagesKey in messages) {

            if (!messagesMap[messagesKey]) {
                messagesMap[messagesKey] = []
            }

            if (messagesMap[messagesKey].length) {
                for (const localeToCompare of messagesMap[messagesKey]) {
                    expect(localeToCompare.value, `Locale "${code}" have equal value for key "${messagesKey}" in locale "${localeToCompare.code}"`).not.toEqual(messages[messagesKey].message)
                }
            }

            messagesMap[messagesKey].push({
                code,
                value: messages[messagesKey].message
            })
        }
    }
})