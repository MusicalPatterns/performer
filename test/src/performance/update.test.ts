import { noop, to } from '@musical-patterns/utilities'
import { PreparedVoice, Sound, update } from '../../../src/indexForTest'
import Spy = jasmine.Spy

describe('update', () => {
    const testSound: Sound = {
        duration: to.Ms(5),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    const nextTestSound: Sound = {
        duration: to.Ms(3),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    it('uses duration and sustain to determine the next sound stop and start', () => {
        const preparedVoice: PreparedVoice = {
            nextStart: to.Ms(0),
            nextStop: to.Ms(0),
            soundIndex: to.Ordinal(0),
            sounds: [ testSound, nextTestSound ],
            source: {
                startSound: noop,
                stopSound: noop,
            },
        }

        update(preparedVoice, to.Ms(0.001))

        expect(preparedVoice.nextStart)
            .toBe(to.Ms(5))
        expect(preparedVoice.nextStop)
            .toBe(to.Ms(1))
        expect(preparedVoice.soundIndex)
            .toBe(to.Ordinal(1))
    })

    describe('next sound', () => {
        it('sets sound index to the next sound', () => {
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(0),
                nextStop: to.Ms(0),
                soundIndex: to.Ordinal(0),
                sounds: [
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
                source: {
                    startSound: noop,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(0.001))

            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(1))
        })

        it('wraps around to the beginning if it has reached the final sound', () => {
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(5),
                nextStop: to.Ms(1),
                soundIndex: to.Ordinal(1),
                sounds: [
                    testSound,
                    nextTestSound,
                ],
                source: {
                    startSound: noop,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(5.001))

            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(0))
        })
    })

    describe('starting and stopping', () => {
        it(`calls the source's start sound method when the next start is reached`, () => {
            const startSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(8),
                nextStop: to.Ms(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSound ],
                source: {
                    startSound,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(8.001))

            expect(startSound)
                .toHaveBeenCalled()
        })

        it(`does not call the source's start sound method when the next start is not yet reached`, () => {
            const startSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(8),
                nextStop: to.Ms(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSound ],
                source: {
                    startSound,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(7))

            expect(startSound)
                .not
                .toHaveBeenCalled()
        })

        it(`calls the source's stop sound method when the next stop is reached`, () => {
            const stopSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(0),
                nextStop: to.Ms(8),
                soundIndex: to.Ordinal(0),
                sounds: [ testSound ],
                source: {
                    startSound: noop,
                    stopSound,
                },
            }

            update(preparedVoice, to.Ms(8.001))

            expect(stopSound)
                .toHaveBeenCalled()
        })

        it(`does not call the source's stop sound method when the next stop is not yet reached`, () => {
            const stopSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                nextStart: to.Ms(0),
                nextStop: to.Ms(8),
                soundIndex: to.Ordinal(0),
                sounds: [ testSound ],
                source: {
                    startSound: noop,
                    stopSound,
                },
            }

            update(preparedVoice, to.Ms(7))

            expect(stopSound)
                .not
                .toHaveBeenCalled()
        })
    })

    it('when there are no sounds, it does not crash', () => {
        const preparedVoice: PreparedVoice = {
            nextStart: to.Ms(0),
            nextStop: to.Ms(0),
            soundIndex: to.Ordinal(0),
            sounds: [],
            source: {
                startSound: noop,
                stopSound: noop,
            },
        }

        update(preparedVoice, to.Ms(0.001))
    })
})
