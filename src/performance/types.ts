import { Coordinate, Frequency, Scalar } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { SourceNode, Timbre, VoiceType } from '../construction'

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

interface ImmersiveParameters {
    positionNode: Object3D,
    webVr: Vrb,
}

interface BuildStartNoteParameters {
    timbre: Timbre,
    voiceType: VoiceType,
}

interface BuildStartImmersiveNoteParameters extends BuildStartNoteParameters, ImmersiveParameters {
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

interface BuildStopNoteParameters {
    startedNote: StartedNote,
}

interface BuildStopImmersiveNoteParameters {
    positionNode: Object3D,
    startedNote: StartedImmersiveNote,
}

interface BuildGainNodeParameters {
    gain: Scalar,
    sourceNode: SourceNode,
}

interface BuildImmersiveGainNodeParameters {
    gain: Scalar,
    positionalAudio: PositionalAudio,
}

interface BuildPositionalAudioParameters extends ImmersiveParameters {
    position: Coordinate,
    sourceNode: SourceNode,
}

export {
    NoteToPlay,
    StartNote,
    StopNote,
    BuildStartNoteParameters,
    BuildStartImmersiveNoteParameters,
    StartNoteAndStartedNote,
    StartImmersiveNoteAndStartedNote,
    StartedNote,
    StartedImmersiveNote,
    BuildStopNoteParameters,
    BuildStopImmersiveNoteParameters,
    BuildGainNodeParameters,
    BuildImmersiveGainNodeParameters,
    BuildPositionalAudioParameters,
}
