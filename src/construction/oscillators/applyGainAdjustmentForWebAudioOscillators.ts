import { apply } from '@musical-patterns/utilities'
import { Note } from '../../types'
import { GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS } from './constants'

const applyGainAdjustmentForWebAudioOscillators: (note: Note) => Note =
    (note: Note): Note =>
        ({ ...note, gain: apply.Scalar(note.gain, GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS) })

export {
    applyGainAdjustmentForWebAudioOscillators,
}
