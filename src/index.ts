import { Coordinate, Frequency, Index, Scalar, Time } from './nominal'
import { SampleName } from './performance'

interface NoteToPlay {
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate
}

type StartNote = (note: NoteToPlay) => void

type StopNote = () => void

enum OscillatorName {
    SQUARE = 'square',
    SINE = 'sine',
    SAWTOOTH = 'sawtooth',
    TRIANGLE = 'triangle',
    CUSTOM = 'custom',
}

enum TimeType {
    RAW = 'raw',
    ATOMIC = 'atomic',
}

interface Note {
    duration: Time,
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate,
    sustain: Time,
}

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    notes: Note[],
    timeType: TimeType,
    voice: Voice,
}

enum VoiceType {
    OSCILLATOR = 'oscillator',
    SAMPLE = 'sample',
}

enum SpatializationType {
    MONO = 'mono',
    IMMERSIVE = 'immersive',
}

interface PrepareOscillatorVoiceParameters {
    spatialization?: SpatializationType,
    timbre: OscillatorType,
}

interface PrepareSampleVoiceParameters {
    spatialization?: SpatializationType,
    timbre: SampleName,
}

export {
    PrepareOscillatorVoiceParameters,
    PrepareSampleVoiceParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    OscillatorName,
    VoiceType,
    TimeType,
    SpatializationType,
    Voice,
    Note,
    Thread,
}

export {
    prepareOscillatorVoice,
    prepareSampleVoice,
    restart,
    SampleName,
} from './performance'
export { setupPerformer } from './setupPerformer'
