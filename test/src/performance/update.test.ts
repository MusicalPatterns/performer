import { noop, to } from '@musical-patterns/utilities'
import { Thread, update } from '../../../src/indexForTest'

describe('update', () => {
    it('uses duration and sustain to determine the next note end and start', () => {
        const thread: Thread = {
            nextEnd: to.Time(0),
            nextStart: to.Time(0),
            noteIndex: to.Index(0),
            notes: [
                {
                    duration: to.Time(5),
                    frequency: to.Frequency(1),
                    gain: to.Scalar(1),
                    position: to.Coordinate([ 1 ]),
                    sustain: to.Time(1),
                },
            ],
            voice: {
                startNote: noop,
                stopNote: noop,
            },
        }

        update(thread, to.Time(0))

        expect(thread.nextStart)
            .toBe(to.Time(5))
        expect(thread.nextEnd)
            .toBe(to.Time(1))
        expect(thread.noteIndex)
            .toBe(to.Index(1))
    })

    describe('next note', () => {
        it('sets note index to the next note', () => {
            const thread: Thread = {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                notes: [
                    {
                        duration: to.Time(5),
                        frequency: to.Frequency(1),
                        gain: to.Scalar(1),
                        position: to.Coordinate([ 1 ]),
                        sustain: to.Time(1),
                    },
                    {
                        duration: to.Time(3),
                        frequency: to.Frequency(1),
                        gain: to.Scalar(1),
                        position: to.Coordinate([ 1 ]),
                        sustain: to.Time(1),
                    },
                ],
                voice: {
                    startNote: noop,
                    stopNote: noop,
                },
            }

            update(thread, to.Time(0))

            expect(thread.noteIndex)
                .toBe(to.Index(1))
        })

        it('wraps around to the beginning if it has reached the last note (though it takes two passes)', () => {
            const thread: Thread = {
                nextEnd: to.Time(1),
                nextStart: to.Time(5),
                noteIndex: to.Index(1),
                notes: [
                    {
                        duration: to.Time(5),
                        frequency: to.Frequency(1),
                        gain: to.Scalar(1),
                        position: to.Coordinate([ 1 ]),
                        sustain: to.Time(1),
                    },
                    {
                        duration: to.Time(3),
                        frequency: to.Frequency(1),
                        gain: to.Scalar(1),
                        position: to.Coordinate([ 1 ]),
                        sustain: to.Time(1),
                    },
                ],
                voice: {
                    startNote: noop,
                    stopNote: noop,
                },
            }

            update(thread, to.Time(5))
            update(thread, to.Time(5.001))

            expect(thread.noteIndex)
                .toBe(to.Index(0))
        })
    })
})
