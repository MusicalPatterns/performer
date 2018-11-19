// tslint:disable no-magic-numbers

import { Frequency, Index, Scalar, to } from '@musical-patterns/utilities'
import { Cents, to as performerTo } from './nominal'

const OCTAVE: Scalar = to.Scalar(2)

const X_AXIS: Index = to.Index(0)
const Y_AXIS: Index = to.Index(1)
const Z_AXIS: Index = to.Index(2)

const STANDARDIZED_SAMPLE_PITCH_OF_C5: Frequency = to.Frequency(523.25)

const BASE_GAIN: Scalar = to.Scalar(0.1)

const CENTS_PER_OCTAVE: Cents = performerTo.Cents(1200)

export {
    OCTAVE,
    X_AXIS,
    Y_AXIS,
    Z_AXIS,
    STANDARDIZED_SAMPLE_PITCH_OF_C5,
    BASE_GAIN,
    CENTS_PER_OCTAVE,
}
