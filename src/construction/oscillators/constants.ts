// tslint:disable no-magic-numbers

import { Amplitude, Scalar, to } from '@musical-patterns/utilities'

const GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS: Scalar<Amplitude> = to.Scalar(to.Amplitude(0.1))

export {
    GAIN_ADJUSTMENT_FOR_WEB_AUDIO_OSCILLATORS,
}
