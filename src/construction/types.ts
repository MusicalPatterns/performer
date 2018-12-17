// tslint:disable:max-file-line-count

import { Cents } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { StartNote, StopNote } from '../performance'

type SourceNode = AudioBufferSourceNode | OscillatorNode

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

interface StartNoteAnd {
    startNote: StartNote,
}

interface BuildStartNoteParameters {
    timbre: Timbre,
    voiceType: VoiceType,
}

interface BuildStartImmersiveNoteParameters extends BuildStartNoteParameters {
    positionNode: Object3D,
    webVr: Vrb,
}

interface StartNoteAndStartedNote extends StartNoteAnd {
    startedNote: StartedNote
}

interface StartImmersiveNoteAndStartedNote extends StartNoteAnd {
    startedNote: StartedImmersiveNote
}

interface StartedNote {
    gainNode?: GainNode,
    sourceNode?: SourceNode,
}

interface StartedImmersiveNote extends StartedNote {
    positionalAudio?: PositionalAudio
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
    BuildStartNoteParameters,
    BuildStartImmersiveNoteParameters,
    StartNoteAndStartedNote,
    StartImmersiveNoteAndStartedNote,
    StartedNote,
    StartedImmersiveNote,
}
