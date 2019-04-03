import { BEGINNING, INITIAL, NO_DURATION, noop, to } from '@musical-patterns/utilities'
import { NON_SEGNO_INDEX, PreparedVoice, Sound, update } from '../../../src/indexForTest'
import Spy = jasmine.Spy

describe('update', () => {
    const testSoundDurationFive: Sound = {
        duration: to.Ms(5),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    const testSoundDurationThree: Sound = {
        duration: to.Ms(3),
        frequency: to.Hz(1),
        gain: to.Scalar(1),
        position: [ 1 ].map(to.Meters),
        sustain: to.Ms(1),
    }

    it('uses duration and sustain to determine the next sound stop and start', () => {
        const preparedVoice: PreparedVoice = {
            delay: NO_DURATION,
            nextStart: BEGINNING,
            nextStop: BEGINNING,
            segnoIndex: to.Ordinal(0),
            soundIndex: to.Ordinal(0),
            sounds: [ testSoundDurationFive, testSoundDurationThree ],
            source: {
                startSound: noop,
                stopSound:
                noop,
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

    describe('sound index', () => {
        it('sets sound index to the next sound', () => {
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: BEGINNING,
                nextStop: BEGINNING,
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(0),
                sounds: [
                    testSoundDurationFive,
                    testSoundDurationThree,
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

        it('repeats from the beginning if it has reached the final sound', () => {
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: to.Ms(5),
                nextStop: to.Ms(1),
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(1),
                sounds: [
                    testSoundDurationFive,
                    testSoundDurationThree,
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

        it('repeats from the segno index, even if it is not 0 the default', () => {
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: to.Ms(5),
                nextStop: to.Ms(1),
                segnoIndex: to.Ordinal(1),
                soundIndex: to.Ordinal(1),
                sounds: [
                    testSoundDurationFive,
                    testSoundDurationThree,
                ],
                source: {
                    startSound: noop,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(5.001))

            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(1))
        })

        it('when the segno index is -1 (the non-segno index) it stops playing when it reaches the end', () => {
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: to.Ms(5),
                nextStop: to.Ms(1),
                segnoIndex: NON_SEGNO_INDEX,
                soundIndex: to.Ordinal(1),
                sounds: [
                    testSoundDurationFive,
                    testSoundDurationThree,
                ],
                source: {
                    startSound: noop,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(5.001))

            expect(preparedVoice.soundIndex)
                .toBe(NON_SEGNO_INDEX)
        })

        it('when there is a delay, the sounds are not reached until their time plus the delay', () => {
            const preparedVoice: PreparedVoice = {
                delay: to.Ms(7),
                nextStart: BEGINNING,
                nextStop: BEGINNING,
                segnoIndex: INITIAL,
                soundIndex: INITIAL,
                sounds: [
                    testSoundDurationFive,
                    testSoundDurationThree,
                ],
                source: {
                    startSound: noop,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(0.001))
            expect(preparedVoice.soundIndex)
                .toBe(INITIAL)

            update(preparedVoice, to.Ms(5.001))
            expect(preparedVoice.soundIndex)
                .toBe(INITIAL)

            update(preparedVoice, to.Ms(7.001))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(1))

            update(preparedVoice, to.Ms(11.001))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(1))

            update(preparedVoice, to.Ms(12.001))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(0))
        })
    })

    describe('starting and stopping', () => {
        it(`calls the source's start sound method when the next start is reached`, () => {
            const startSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: to.Ms(8),
                nextStop: BEGINNING,
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSoundDurationFive ],
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
                delay: NO_DURATION,
                nextStart: to.Ms(8),
                nextStop: BEGINNING,
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSoundDurationFive ],
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
                delay: NO_DURATION,
                nextStart: BEGINNING,
                nextStop: to.Ms(8),
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSoundDurationFive ],
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
                delay: NO_DURATION,
                nextStart: BEGINNING,
                nextStop: to.Ms(8),
                segnoIndex: to.Ordinal(0),
                soundIndex: to.Ordinal(0),
                sounds: [ testSoundDurationFive ],
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

        it(`does not call the source's start sound method when the sound index has been set to -1 (the non-segno index) after reaching the end of a voice that does not repeat`, () => {
            const startSound: Spy = jasmine.createSpy()
            const preparedVoice: PreparedVoice = {
                delay: NO_DURATION,
                nextStart: to.Ms(8),
                nextStop: BEGINNING,
                segnoIndex: NON_SEGNO_INDEX,
                soundIndex: NON_SEGNO_INDEX,
                sounds: [ testSoundDurationFive ],
                source: {
                    startSound,
                    stopSound: noop,
                },
            }

            update(preparedVoice, to.Ms(8.001))

            expect(startSound)
                .not
                .toHaveBeenCalled()
        })
    })

    it('when there are no sounds, it does not crash', () => {
        const preparedVoice: PreparedVoice = {
            delay: NO_DURATION,
            nextStart: BEGINNING,
            nextStop: BEGINNING,
            segnoIndex: to.Ordinal(0),
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
