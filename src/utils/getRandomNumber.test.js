import {getRandomNumber, getRealtySatisfaction} from './getRandomNumber'

describe('getRandomNumber', () => {
    test('Правильное значение', () => {
        expect(getRandomNumber(100)).toBeGreaterThan(0)
        expect(getRandomNumber(100)).toBeLessThan(100)
    })
    
})

describe('getRealtySatisfaction', () => {
    test('Right value', () => {
        expect(getRealtySatisfaction(0.4)).toBeLessThan(1)
        expect(getRealtySatisfaction(0.4)).toBeGreaterThan(0.6)
    })
})