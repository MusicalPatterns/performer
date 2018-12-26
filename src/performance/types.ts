import { Coordinate, Frequency, Maybe, Scalar } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { SourceNode } from './source'

interface NoteToPlay {
    frequency: Frequency,
    gain: Scalar,
    playbackRate?: Scalar,
    position: Coordinate,
}

type StartNote = (note: NoteToPlay) => void

type StopNote = () => void

interface StartNoteAnd {
    startNote: StartNote,
}

interface BuildStartNoteParameters {
    timbre: Timbre,
    voiceType: VoiceType,
    webVr?: Vrb,
}

interface StartNoteAndStartedNote extends StartNoteAnd {
    startedNote: StartedNote
}

interface StartedNote {
    gainNode?: GainNode,
    positionalAudio?: PositionalAudio,
    positionNode?: Object3D,
    sourceNode?: SourceNode,
}

interface BuildStopNoteParameters {
    startedNote: StartedNote,
}

interface BuildGainNodeParameters {
    gain: Scalar,
    positionalAudio: Maybe<PositionalAudio>,
    sourceNode: SourceNode,
}

interface BuildPositionalAudioParameters {
    position: Coordinate,
    positionNode: Object3D,
    sourceNode: SourceNode,
    webVr: Vrb,
}

enum VoiceType {
    OSCILLATOR = 'OSCILLATOR',
    SAMPLE = 'SAMPLE',
}

type Timbre = AudioBuffer | PeriodicWave

export {
    NoteToPlay,
    StartNote,
    StopNote,
    BuildStartNoteParameters,
    StartNoteAndStartedNote,
    StartedNote,
    BuildStopNoteParameters,
    BuildGainNodeParameters,
    BuildPositionalAudioParameters,
    Timbre,
    VoiceType,
}
