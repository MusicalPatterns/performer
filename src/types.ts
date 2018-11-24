import { Coordinate, Frequency, Index, Scalar, Time } from '@musical-patterns/utilities'
import { SampleName, Voice } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    part: Note[],
    voice: Voice,
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

interface ThreadSpec {
    part: Part,
    voiceSpec: VoiceSpec,
}

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

type OnUpdate = (time: Time) => void

interface SetupPerformerParameters {
    onUpdate: OnUpdate,
}

export {
    Thread,
    OscillatorName,
    VoiceType,
    SpatializationType,
    Note,
    Part,
    ThreadSpec,
    VoiceSpec,
    SetupPerformerParameters,
    OnUpdate,
}