// tslint:disable no-magic-numbers

import { Scalar, to } from '@musical-patterns/utilities'
import { Cents, Semitones, to as performerTo } from '../nominal'

const BASE_DURATION: Scalar = to.Scalar(7)

const CENTS_PER_SEMITONE: Cents = performerTo.Cents(100)

const UP_TWO_SEMITONES: Semitones = performerTo.Semitones(2)
const DOWN_ONE_SEMITONE: Semitones = performerTo.Semitones(-1)
const UP_ONE_OCTAVE_IN_SEMITONES: Semitones = performerTo.Semitones(12)
const UP_TWO_OCTAVES_IN_SEMITONES: Semitones = performerTo.Semitones(24)
const DOWN_TWO_OCTAVES_IN_SEMITONES: Semitones = performerTo.Semitones(-24)

const MILLISECONDS_PER_SECOND: number = 1000
const TARGET_FPS: number = 120
const TIMESTEP: number = MILLISECONDS_PER_SECOND / TARGET_FPS

export {
    BASE_DURATION,
    CENTS_PER_SEMITONE,
    UP_TWO_SEMITONES,
    DOWN_ONE_SEMITONE,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    TIMESTEP,
}
