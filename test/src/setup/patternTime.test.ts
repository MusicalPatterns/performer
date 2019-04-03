import { Ms, to } from '@musical-patterns/utilities'
import { computePatternTime } from '../../../src/indexForTest'

describe('pattern time', () => {
    it('keeps repeating from the segno time', () => {
        const segnoTime: Ms = to.Ms(5)
        const totalDuration: Ms = to.Ms(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(0),
            totalDuration,
        }))
            .toBe(to.Ms(0))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(5),
            totalDuration,
        }))
            .toBe(to.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(9),
            totalDuration,
        }))
            .toBe(to.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(10),
            totalDuration,
        }))
            .toBe(to.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(14),
            totalDuration,
        }))
            .toBe(to.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(20),
            totalDuration,
        }))
            .toBe(to.Ms(5))
    })
})
