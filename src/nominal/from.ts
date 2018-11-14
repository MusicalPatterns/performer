// tslint:disable:variable-name no-any

import {
    Cents,
    CoordinateElement,
    Frequency,
    Index,
    Offset,
    Power,
    Scalar,
    Semitones,
    Time,
} from './types'

const Cents: (cents: Cents) => number =
    (cents: Cents): number => cents as any
const Frequency: (frequency: Frequency) => number =
    (frequency: Frequency): number => frequency as any
const Index: (index: Index) => number =
    (index: Index): number => index as any
const Offset: (offset: Offset) => number =
    (offset: Offset): number => offset as any
const Power: (power: Power) => number =
    (power: Power): number => power as any
const Scalar: (scalar: Scalar) => number =
    (scalar: Scalar): number => scalar as any
const Semitones: (semitones: Semitones) => number =
    (semitones: Semitones): number => semitones as any
const Time: (time: Time) => number =
    (time: Time): number => time as any

const CoordinateElement: (coordinateElement: CoordinateElement) => number =
    (coordinateElement: CoordinateElement): number => coordinateElement as any

export {
    Cents,
    Frequency,
    Index,
    Offset,
    Power,
    Scalar,
    Semitones,
    Time,
    CoordinateElement,
}
