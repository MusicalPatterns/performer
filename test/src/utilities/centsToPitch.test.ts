import { Scalar, to } from '@musical-patterns/utilities'
import { centsToPitch, to as performerTo } from '../../../src/indexForTest'
import { testIsCloseTo } from '../../support'

describe('cents to pitch', () => {
    it('gives the pitch ratio equivalent to the cents amount', () => {
        const actual: Scalar = centsToPitch(performerTo.Cents(701.955001))

        expect(testIsCloseTo(actual, to.Scalar(3 / 2)))
            .toBe(true)
    })
})
