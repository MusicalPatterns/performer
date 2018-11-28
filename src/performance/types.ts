import { Cents, Coordinate, Frequency, Scalar } from '@musical-patterns/shared'

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

interface SampleData {
    centsAdjustment?: Cents,
    unpitched?: boolean,
}

type SampleDatas = { [x in SampleName]: SampleData }

type ModulePath = string

type OscillatorNameToTypeMap = { [K in OscillatorName]: string }

export {
    SampleVoiceConstructorParameters,
    OscillatorVoiceConstructorParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    Voice,
    SampleData,
    SampleDatas,
    ModulePath,
    OscillatorNameToTypeMap,
}
