// tslint:disable:variable-name no-any

import {
    Cents,
    Coordinate,
    CoordinateElement,
    Count,
    Frequency,
    Index,
    Offset,
    Power,
    Scalar,
    Semitones,
    Time,
} from './types'

const Cents: (cents: number) => Cents =
    (cents: number): Cents => cents as any
const Count: (count: number) => Count =
    (count: number): Count => count as any
const Frequency: (frequency: number) => Frequency =
    (frequency: number): Frequency => frequency as any
const Index: (index: number) => Index =
    (index: number): Index => index as any
const Offset: (offset: number) => Offset =
    (offset: number): Offset => offset as any
const Power: (power: number) => Power =
    (power: number): Power => power as any
const Scalar: (scalar: number) => Scalar =
    (scalar: number): Scalar => scalar as any
const Semitones: (semitones: number) => Semitones =
    (semitones: number): Semitones => semitones as any
const Time: (duration: number) => Time =
    (duration: number): Time => duration as any

const CoordinateElement: (coordinateElement: number) => CoordinateElement =
    (coordinateElement: number): CoordinateElement => coordinateElement as any

const Coordinate: (coordinate: Array<number | CoordinateElement>) => Coordinate =
    (coordinate: Array<number | CoordinateElement>): Coordinate =>
        coordinate.map((coordinateElement: number | CoordinateElement): CoordinateElement =>
            coordinateElement as any) as any

export {
    Cents,
    Count,
    Frequency,
    Index,
    Offset,
    Power,
    Scalar,
    Semitones,
    Time,
    CoordinateElement,
    Coordinate,
}
