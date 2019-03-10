import { apply } from '@musical-patterns/utilities'
import { Sound } from '../../types'
import { GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS } from './constants'

const applyGainAdjustmentForWebAudioOscillators: (sound: Sound) => Sound =
    (sound: Sound): Sound =>
        ({ ...sound, gain: apply.Scalar(sound.gain, GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS) })

export {
    applyGainAdjustmentForWebAudioOscillators,
}
