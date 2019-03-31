import { Ms, to } from '@musical-patterns/utilities'
import { PreparedVoice, prepareVoices, Voice } from '../../../src/indexForTest'

describe('prepare voices', () => {
    it('defaults sounds to empty array, and next start, next stop, and sound index each to zero', async (done: DoneFn) => {
        const voices: Voice[] = [
            {},
        ]

        const preparedVoices: PreparedVoice[] = await prepareVoices(voices)
        const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

        expect(preparedVoice.nextStop)
            .toBe(to.Ms(0))
        expect(preparedVoice.nextStart)
            .toBe(to.Ms(0))
        expect(preparedVoice.soundIndex)
            .toBe(to.Ordinal(0))
        expect(preparedVoice.sounds)
            .toEqual([])

        done()
    })

    it('does not crash if a voice with empty sounds is prepared when the time position is not at the beginning', async (done: DoneFn) => {
        const voices: Voice[] = [
            {
                sounds: [],
            },
        ]
        const startTime: Ms = to.Ms(2)

        await prepareVoices(voices, startTime)
        done()
    })

    describe('when provided a start time', () => {
        it('picks the correct first sound index, and the correct time when the next sound will start', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    sounds: [
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
            const startTime
                :
                Ms = to.Ms(2)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(to.Ms(5))
            expect(preparedVoice.nextStart)
                .toBe(to.Ms(5))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(1))

            done()
        })

        it('wraps around if the start time is longer than the pattern itself', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    sounds: [
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

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(to.Ms(16))
            expect(preparedVoice.nextStart)
                .toBe(to.Ms(16))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal(0))

            done()
        })
    })
})
