// tslint:disable:max-file-line-count

import { Cents, Coordinate, Frequency, Scalar, Time } from '@musical-patterns/utilities'

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

interface VoiceSpec {
    spatialization?: SpatializationType,
    timbre: SampleName | OscillatorName,
    voiceType: VoiceType,
}

enum VoiceType {
    OSCILLATOR = 'OSCILLATOR',
    SAMPLE = 'SAMPLE',
}

enum SpatializationType {
    MONO = 'MONO',
    IMMERSIVE = 'IMMERSIVE',
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

interface Note {
    duration: Time,
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate,
    sustain: Time,
}

type Part = Note[]

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
    VoiceSpec,
    VoiceType,
    SpatializationType,
    SampleName,
    OscillatorName,
    Note,
    Part,
}
