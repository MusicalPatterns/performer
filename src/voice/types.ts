import { Cents, Coordinate, Frequency, Scalar } from '@musical-patterns/utilities'

interface SampleVoiceConstructorParameters {
    timbre: SampleName,
}

interface OscillatorVoiceConstructorParameters {
    timbre: OscillatorName,
}

interface SampleData {
    centsAdjustment?: Cents,
    unpitched?: boolean,
}

type SampleDatas = { [x in SampleName]: SampleData }

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

type ModulePath = string

type OscillatorNameToTypeMap = { [K in OscillatorName]: string }

interface VoiceSpec {
    timbre: SampleName | OscillatorName,
    voiceType: VoiceType,
}

enum VoiceType {
    OSCILLATOR = 'OSCILLATOR',
    SAMPLE = 'SAMPLE',
}

enum SampleName {
    CELLO = 'CELLO',
    DOUBLE_BASS = 'DOUBLE_BASS',
    FLUTE = 'FLUTE',
    PIANO = 'PIANO',
    TROMBONE = 'TROMBONE',
    TRUMPET = 'TRUMPET',
    TUBA = 'TUBA',
    VIOLIN = 'VIOLIN',
    SNARE = 'SNARE',
    KICK = 'KICK',
    HIHAT = 'HIHAT',
}

enum OscillatorName {
    SQUARE = 'SQUARE',
    SINE = 'SINE',
    SAWTOOTH = 'SAWTOOTH',
    TRIANGLE = 'TRIANGLE',
    CUSTOM = 'CUSTOM',
}

export {
    SampleName,
    SampleData,
    SampleDatas,
    OscillatorVoiceConstructorParameters,
    SampleVoiceConstructorParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    Voice,
    ModulePath,
    OscillatorNameToTypeMap,
    OscillatorName,
    VoiceSpec,
    VoiceType,
}
