import * as to from '@musical-patterns/utilities/dist/nominal/to'
import { constructThreads, Thread, ThreadSpec } from '../../../src/indexForTest'

describe('construct threads', () => {
    it('defaults notes to empty array', () => {
        const threadSpecs: ThreadSpec[] = [
            {},
        ]

        const threads: Thread[] = constructThreads(threadSpecs)

        expect(threads[ 0 ].nextEnd)
            .toBe(to.Time(0))
        expect(threads[ 0 ].nextStart)
            .toBe(to.Time(0))
        expect(threads[ 0 ].noteIndex)
            .toBe(to.Index(0))
        expect(threads[ 0 ].notes)
            .toEqual([])
    })
})
