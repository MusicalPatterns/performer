// tslint:disable no-magic-numbers

import { Frequency, Scalar, to } from '@musical-patterns/shared'

const STANDARDIZED_SAMPLE_PITCH_OF_C5: Frequency = to.Frequency(523.25)

const GAIN_ADJUST_FOR_WEB_AUDIO: Scalar = to.Scalar(0.1)

export {
    STANDARDIZED_SAMPLE_PITCH_OF_C5,
    GAIN_ADJUST_FOR_WEB_AUDIO,
}
