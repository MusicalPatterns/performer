import { Cents, DictionaryOf } from '@musical-patterns/utilities'
import { StartNote, StopNote } from '../performance'

type SourceNode = (AudioBufferSourceNode | OscillatorNode) & DictionaryOf<SourceNodeKey>

type SourceNodeKey = Timbre & SourceNodeIndexSignature

interface SourceNodeIndexSignature {
    value: number,
}

type TimbreName = SampleName | OscillatorName

type Timbre = AudioBuffer | OscillatorType

interface SampleData {
    centsAdjustment?: Cents,
    unpitched?: boolean,
}

type SampleDatas = { [x in SampleName]: SampleData }

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

type ModulePath = string

type OscillatorNameToTypeMap = { [K in OscillatorName]: string }

interface VoiceSpec {
    timbreName: TimbreName,
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
    Voice,
    ModulePath,
    OscillatorNameToTypeMap,
    OscillatorName,
    VoiceSpec,
    VoiceType,
    TimbreName,
    SourceNode,
    Timbre,
    SourceNodeKey,
}
