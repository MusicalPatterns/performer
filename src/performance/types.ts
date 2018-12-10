import { Coordinate, Frequency, Scalar, Time } from '@musical-patterns/utilities'

interface Note {
    duration: Time,
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate,
    sustain: Time,
}

export {
    Note,
}
