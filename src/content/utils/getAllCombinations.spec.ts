import {expect, test} from '@playwright/test';
import {getAllCombinations, getSlice} from './getAllCombinations.js'

const array = [1, 2, 3, 4, 5]
const dataset = [
    {
        size: 1, slices: [
            [1],
            [2],
            [3],
            [4],
            [5]
        ]
    },

    {
        size: 2, slices: [
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
            [2, 3],
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
            [4, 5]
        ]
    },

    {
        size: 3, slices: [
            [1, 2, 3],
            [1, 2, 4],
            [1, 2, 5],
            [1, 3, 4],
            [1, 3, 5],
            [1, 4, 5],
            [2, 3, 4],
            [2, 3, 5],
            [2, 4, 5],
            [3, 4, 5]
        ]
    },

    {
        size: 4, slices: [
            [1, 2, 3, 4],
            [1, 2, 3, 5],
            [1, 2, 4, 5],
            [1, 3, 4, 5],
            [2, 3, 4, 5]
        ]
    },

    {
        size: 5, slices: [
            [1, 2, 3, 4, 5]
        ]
    },
]

test('getAllCombinations', () => {
    expect([...getAllCombinations(array)]).toEqual(dataset.flatMap(s => s.slices))
});


test.describe('getSlice', () => {
    for (const {size, slices} of dataset) {
        test(`... size: ${size}`, () => {
            expect([...getSlice(array, size)]).toEqual(slices)
        })
    }
});
