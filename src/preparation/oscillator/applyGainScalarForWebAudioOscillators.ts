import { apply } from '@musical-patterns/utilities'
import { Sound } from '../../types'
import { GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS } from './constants'

const applyGainScalarForWebAudioOscillators: (sound: Sound) => Sound =
    (sound: Sound): Sound =>
        ({ ...sound, gain: apply.Scalar(sound.gain, GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS) })

export {
    applyGainScalarForWebAudioOscillators,
}
