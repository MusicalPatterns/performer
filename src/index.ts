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

interface Note {
    duration: Time,
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate,
    sustain: Time,
}

type Part = Note[]

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    part: Note[],
    voice: Voice,
}

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
    OSCILLATOR = 'oscillator',
    SAMPLE = 'sample',
}

enum SpatializationType {
    MONO = 'mono',
    IMMERSIVE = 'immersive',
}

interface SampleVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: SampleName,
}

interface OscillatorVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: OscillatorName,
}

export {
    OscillatorVoiceConstructorParameters,
    SampleVoiceConstructorParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    OscillatorName,
    VoiceType,
    SpatializationType,
    Voice,
    Note,
    Thread,
    ThreadSpec,
    VoiceSpec,
    Part,
}

export {
    restart,
    SampleName,
} from './performance'
export { setupPerformer } from './setupPerformer'
