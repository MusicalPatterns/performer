import { Coordinate, Frequency, Scalar } from '@musical-patterns/utilities'

interface NoteToPlay {
    frequency: Frequency,
    gain: Scalar,
    playbackRate?: Scalar,
    position: Coordinate,
}

type StartNote = (note: NoteToPlay) => void

type StopNote = () => void

export {
    NoteToPlay,
    StartNote,
    StopNote,
}
