import { apply, indexJustBeyondFinalElement, INITIAL, isEmpty, Ms, NEXT, to } from '@musical-patterns/utilities'
import { PreparedVoice, Sound } from '../types'

const startPreparedVoiceSound: (preparedVoice: PreparedVoice, sound: Sound) => void =
    (preparedVoice: PreparedVoice, sound: Sound): void => {
        preparedVoice.source.startSound({
            ...sound,
            position: sound.position || [ 0, 0, 0 ].map(to.Meters),
        })

        preparedVoice.nextStop = apply.Translation(
            preparedVoice.nextStart,
            to.Translation(sound.sustain),
        )
        preparedVoice.nextStart = apply.Translation(
            preparedVoice.nextStart,
            to.Translation(sound.duration),
        )

        preparedVoice.soundIndex = apply.Translation(preparedVoice.soundIndex, NEXT)

        if (preparedVoice.soundIndex === indexJustBeyondFinalElement(preparedVoice.sounds)) {
            preparedVoice.soundIndex = preparedVoice.segnoIndex
        }
    }

const update: (preparedVoice: PreparedVoice, timePosition: Ms) => void =
    (preparedVoice: PreparedVoice, timePosition: Ms): void => {
        const { sounds, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (isEmpty(sounds)) {
            return
        }
        const sound: Sound = apply.Ordinal(sounds, soundIndex)

        if (timePosition > nextStop) {
            source.stopSound()
        }

        if (timePosition > nextStart) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
