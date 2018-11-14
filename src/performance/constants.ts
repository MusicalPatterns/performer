// tslint:disable no-magic-numbers

import { Cents, Scalar, Semitones, to } from '../nominal'

const BASE_DURATION: Scalar = to.Scalar(7)

const CENTS_PER_SEMITONE: Cents = to.Cents(100)

const UP_TWO_SEMITONES: Semitones = to.Semitones(2)
const DOWN_ONE_SEMITONE: Semitones = to.Semitones(-1)
const UP_ONE_OCTAVE_IN_SEMITONES: Semitones = to.Semitones(12)
const UP_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(24)
const DOWN_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(-24)

export {
    BASE_DURATION,
    CENTS_PER_SEMITONE,
    UP_TWO_SEMITONES,
    DOWN_ONE_SEMITONE,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
}
