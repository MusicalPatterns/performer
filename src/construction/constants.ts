// tslint:disable no-magic-numbers

import { Scalar, Semitones, to } from '@musical-patterns/utilities'

const UP_TWO_SEMITONES: Semitones = to.Semitones(2)
const DOWN_ONE_SEMITONE: Semitones = to.Semitones(-1)
const UP_ONE_OCTAVE_IN_SEMITONES: Semitones = to.Semitones(12)
const UP_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(24)
const DOWN_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(-24)

const GAIN_ADJUSTMENT_FOR_WEB_AUDIO: Scalar = to.Scalar(0.1)

export {
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_TWO_SEMITONES,
    GAIN_ADJUSTMENT_FOR_WEB_AUDIO,
}
