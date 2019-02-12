import { noop, to } from '@musical-patterns/utilities'
import { Note, Thread, update } from '../../../src/indexForTest'
import Spy = jasmine.Spy

describe('update', () => {
    const testNote: Note = {
        duration: to.Ms(5),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    const nextTestNote: Note = {
        duration: to.Ms(3),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    it('uses duration and sustain to determine the next note end and start', () => {
        const thread: Thread = {
            nextEnd: to.Ms(0),
            nextStart: to.Ms(0),
            noteIndex: to.Ordinal(0),
            notes: [ testNote, nextTestNote ],
            voice: {
                startNote: noop,
                stopNote: noop,
            },
        }

        update(thread, to.Ms(0.001))

        expect(thread.nextStart)
            .toBe(to.Ms(5))
        expect(thread.nextEnd)
            .toBe(to.Ms(1))
        expect(thread.noteIndex)
            .toBe(to.Ordinal(1))
    })

    describe('next note', () => {
        it('sets note index to the next note', () => {
            const thread: Thread = {
                nextEnd: to.Ms(0),
                nextStart: to.Ms(0),
                noteIndex: to.Ordinal(0),
                notes: [
                    {
                        duration: to.Ms(5),
                        frequency: to.Hz(1),
                        gain: to.Scalar(1),
                        position: [ 1 ].map(to.Meters),
                        sustain: to.Ms(1),
                    },
                    {
                        duration: to.Ms(3),
                        frequency: to.Hz(1),
                        gain: to.Scalar(1),
                        position: [ 1 ].map(to.Meters),
                        sustain: to.Ms(1),
                    },
                ],
                voice: {
                    startNote: noop,
                    stopNote: noop,
                },
            }

            update(thread, to.Ms(0.001))

            expect(thread.noteIndex)
                .toBe(to.Ordinal(1))
        })

        it('wraps around to the beginning if it has reached the last note', () => {
            const thread: Thread = {
                nextEnd: to.Ms(1),
                nextStart: to.Ms(5),
                noteIndex: to.Ordinal(1),
                notes: [
                    testNote,
                    nextTestNote,
                ],
                voice: {
                    startNote: noop,
                    stopNote: noop,
                },
            }

            update(thread, to.Ms(5.001))

            expect(thread.noteIndex)
                .toBe(to.Ordinal(0))
        })
    })

    describe('starting and stopping', () => {
        it('calls the voice\'s start note method when the next start is reached', () => {
            const startNote: Spy = jasmine.createSpy()
            const thread: Thread = {
                nextEnd: to.Ms(0),
                nextStart: to.Ms(8),
                noteIndex: to.Ordinal(0),
                notes: [ testNote ],
                voice: {
                    startNote,
                    stopNote: noop,
                },
            }

            update(thread, to.Ms(8.001))

            expect(startNote)
                .toHaveBeenCalled()
        })

        it('does not call the voice\'s start note method when the next start is not yet reached', () => {
            const startNote: Spy = jasmine.createSpy()
            const thread: Thread = {
                nextEnd: to.Ms(0),
                nextStart: to.Ms(8),
                noteIndex: to.Ordinal(0),
                notes: [ testNote ],
                voice: {
                    startNote,
                    stopNote: noop,
                },
            }

            update(thread, to.Ms(7))

            expect(startNote)
                .not
                .toHaveBeenCalled()
        })

        it('calls the voice\'s stop note method when the next end is reached', () => {
            const stopNote: Spy = jasmine.createSpy()
            const thread: Thread = {
                nextEnd: to.Ms(8),
                nextStart: to.Ms(0),
                noteIndex: to.Ordinal(0),
                notes: [ testNote ],
                voice: {
                    startNote: noop,
                    stopNote,
                },
            }

            update(thread, to.Ms(8.001))

            expect(stopNote)
                .toHaveBeenCalled()
        })

        it('does not call the voice\'s stop note method when the next end is not yet reached', () => {
            const stopNote: Spy = jasmine.createSpy()
            const thread: Thread = {
                nextEnd: to.Ms(8),
                nextStart: to.Ms(0),
                noteIndex: to.Ordinal(0),
                notes: [ testNote ],
                voice: {
                    startNote: noop,
                    stopNote,
                },
            }

            update(thread, to.Ms(7))

            expect(stopNote)
                .not
                .toHaveBeenCalled()
        })
    })
})
