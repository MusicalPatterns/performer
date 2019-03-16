import { apply, from, INITIAL, isEmpty, Ms, NEXT, to } from '@musical-patterns/utilities'
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
        if (from.Ordinal(preparedVoice.soundIndex) === preparedVoice.sounds.length) {
            preparedVoice.soundIndex = INITIAL
        }
    }

const update: (preparedVoice: PreparedVoice, timePosition: Ms) => void =
    (preparedVoice: PreparedVoice, timePosition: Ms): void => {
        if (isEmpty(preparedVoice.sounds)) {
            return
        }

        const sound: Sound = apply.Ordinal(preparedVoice.sounds, preparedVoice.soundIndex)

        if (timePosition > preparedVoice.nextStop) {
            preparedVoice.source.stopSound()
        }

        if (timePosition > preparedVoice.nextStart) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
