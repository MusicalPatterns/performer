// tslint:disable:variable-name no-any

import { Cents, Semitones } from './types'

const Cents: (cents: number) => Cents =
    (cents: number): Cents => cents as any
const Semitones: (semitones: number) => Semitones =
    (semitones: number): Semitones => semitones as any

export {
    Cents,
    Semitones,
}
