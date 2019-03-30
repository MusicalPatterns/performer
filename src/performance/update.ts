import { apply, from, INITIAL, isEmpty, Ms, NEXT, to } from '@musical-patterns/utilities'
import { PreparedVoice, Sound, SoundsSection } from '../types'

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
        const section: SoundsSection = apply.Ordinal(preparedVoice.sections, preparedVoice.sectionIndex)
        if (from.Ordinal(preparedVoice.soundIndex) === section.sounds.length) {
            preparedVoice.soundIndex = INITIAL
        }
    }

const update: (preparedVoice: PreparedVoice, timePosition: Ms) => void =
    (preparedVoice: PreparedVoice, timePosition: Ms): void => {
        const { sections, sectionIndex, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (isEmpty(sections)) {
            return
        }
        const section: SoundsSection = apply.Ordinal(sections, sectionIndex)
        if (isEmpty(section.sounds)) {
            return
        }
        const sound: Sound = apply.Ordinal(section.sounds, soundIndex)

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
