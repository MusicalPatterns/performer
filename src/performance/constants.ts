// tslint:disable no-magic-numbers

import { Semitones, to } from '@musical-patterns/shared'

const UP_TWO_SEMITONES: Semitones = to.Semitones(2)
const DOWN_ONE_SEMITONE: Semitones = to.Semitones(-1)
const UP_ONE_OCTAVE_IN_SEMITONES: Semitones = to.Semitones(12)
const UP_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(24)
const DOWN_TWO_OCTAVES_IN_SEMITONES: Semitones = to.Semitones(-24)

const MILLISECONDS_PER_SECOND: number = 1000
const TARGET_FPS: number = 120
const TIMESTEP: number = MILLISECONDS_PER_SECOND / TARGET_FPS

export {
    UP_TWO_SEMITONES,
    DOWN_ONE_SEMITONE,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    TIMESTEP,
}
