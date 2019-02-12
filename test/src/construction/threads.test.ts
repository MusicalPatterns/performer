import { Ms, to } from '@musical-patterns/utilities'
import { constructThreads, Thread, ThreadSpec } from '../../../src/indexForTest'

describe('construct threads', () => {
    it('defaults notes to empty array, and next start, next end, and note index each to zero', async (done: DoneFn) => {
        const threadSpecs: ThreadSpec[] = [
            {},
        ]

        const threads: Thread[] = await constructThreads(threadSpecs)
        const thread: Thread = threads[ 0 ]

        expect(thread.nextEnd)
            .toBe(to.Ms(0))
        expect(thread.nextStart)
            .toBe(to.Ms(0))
        expect(thread.noteIndex)
            .toBe(to.Ordinal(0))
        expect(thread.notes)
            .toEqual([])

        done()
    })

    describe('when provided a start time', () => {
        it('picks the correct first note index, and the correct time when the next note will start', async (done: DoneFn) => {
            const threadSpecs: ThreadSpec[] = [
                {
                    notes: [
                        {
                            duration: to.Ms(5),
                            frequency: to.Hz(1),
                            gain: to.Scalar(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(4),
                        },
                        {
                            duration: to.Ms(3),
                            frequency: to.Hz(1),
                            gain: to.Scalar(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                    ],
                },
            ]
            const startTime: Ms = to.Ms(2)

            const threads: Thread[] = await constructThreads(threadSpecs, startTime)
            const thread: Thread = threads[ 0 ]

            expect(thread.nextEnd)
                .toBe(to.Ms(5))
            expect(thread.nextStart)
                .toBe(to.Ms(5))
            expect(thread.noteIndex)
                .toBe(to.Ordinal(1))

            done()
        })

        it('wraps around if the start time is longer than the pattern itself', async (done: DoneFn) => {
            const threadSpecs: ThreadSpec[] = [
                {
                    notes: [
                        {
                            duration: to.Ms(5),
                            frequency: to.Hz(1),
                            gain: to.Scalar(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(4),
                        },
                        {
                            duration: to.Ms(3),
                            frequency: to.Hz(1),
                            gain: to.Scalar(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                    ],
                },
            ]
            const startTime: Ms = to.Ms(14)

            const threads: Thread[] = await constructThreads(threadSpecs, startTime)
            const thread: Thread = threads[ 0 ]

            expect(thread.nextEnd)
                .toBe(to.Ms(16))
            expect(thread.nextStart)
                .toBe(to.Ms(16))
            expect(thread.noteIndex)
                .toBe(to.Ordinal(0))

            done()
        })
    })
})
