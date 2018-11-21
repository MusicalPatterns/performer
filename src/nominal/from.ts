// tslint:disable:variable-name no-any

import { Cents, Semitones } from './types'

const Cents: (cents: Cents) => number =
    (cents: Cents): number => cents as any
const Semitones: (semitones: Semitones) => number =
    (semitones: Semitones): number => semitones as any

export {
    Cents,
    Semitones,
}
