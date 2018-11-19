import { Coordinate, Frequency, Scalar } from '@musical-patterns/utilities'
import { OscillatorName, SpatializationType } from '../types'
import { SampleName } from './samples'

interface SampleVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: SampleName,
}

interface OscillatorVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: OscillatorName,
}

interface NoteToPlay {
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate
}

type StartNote = (note: NoteToPlay) => void

type StopNote = () => void

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

export {
    SampleVoiceConstructorParameters,
    OscillatorVoiceConstructorParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    Voice,
}
