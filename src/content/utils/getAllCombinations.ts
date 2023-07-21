export function* getSlice<T extends any>(array: T[], size: number): Generator<T[], void> {
    if (size <= 1) {
        for (const t of array) {
            yield [t]
        }
        return
    }

    if (size >= array.length) {
        yield array
        return
    }

    for (let i = 0; i < array.length - size + 1; i++) {
        let head = array[i]
        const tail = array.slice(i + 1)
        for (const combElement of getSlice(tail, size - 1)) {
            // if (size === 3) console.log({size, head, tail, combElement})
            yield [head, ...combElement]
        }
    }
}

/**
 * Returns all combinations of array.
 * Don't remove duplicate values in an array.
 * @param array
 */
export function* getAllCombinations<T extends any>(array: T[]): Generator<T[], void> {
    console.log({array})
    if (array.length < 2) {
        yield array
        return
    }
    for (let size = 1; size <= array.length; size++) {
        yield* getSlice(array, size)
    }
}