import { to } from '@musical-patterns/utilities'
import { constructThreads, Thread, ThreadSpec } from '../../../src/indexForTest'

describe('construct threads', () => {
    it('defaults notes to empty array, and next start, next end, and note index each to zero', async (done: DoneFn) => {
        const threadSpecs: ThreadSpec[] = [
            {},
        ]

        const threads: Thread[] = await constructThreads(threadSpecs)

        expect(threads[ 0 ].nextEnd)
            .toBe(to.Time(0))
        expect(threads[ 0 ].nextStart)
            .toBe(to.Time(0))
        expect(threads[ 0 ].noteIndex)
            .toBe(to.Index(0))
        expect(threads[ 0 ].notes)
            .toEqual([])

        done()
    })
})
