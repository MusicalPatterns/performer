import { OscillatorName, SpatializationType } from '../index'
import { Coordinate, Frequency, Scalar } from '../nominal'
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
