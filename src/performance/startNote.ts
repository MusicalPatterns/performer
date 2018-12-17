import {
    BuildStartImmersiveNoteParameters,
    BuildStartNoteParameters, StartedImmersiveNote,
    StartedNote, StartImmersiveNoteAndStartedNote,
    StartNoteAndStartedNote,
    VoiceType,
} from '../construction'
import { buildGainNode, buildImmersiveGainNode } from './gainNode'
import { buildPositionalAudio } from './positionalAudio'
import { buildOscillatorSourceNode, buildSampleSourceNode } from './sourceNode'
import { NoteToPlay, StartNote } from './types'

const buildStartNote: (parameters: BuildStartNoteParameters) => StartNoteAndStartedNote =
    (parameters: BuildStartNoteParameters): StartNoteAndStartedNote => {
        const { timbre, voiceType } = parameters

        const startedNote: StartedNote = {}

        const startNote: StartNote = ({ gain, frequency, playbackRate }: NoteToPlay): void => {
            startedNote.sourceNode = voiceType === VoiceType.SAMPLE ?
                buildSampleSourceNode(timbre as AudioBuffer, playbackRate) :
                buildOscillatorSourceNode(timbre as OscillatorType, frequency)
            startedNote.gainNode = buildGainNode(startedNote.sourceNode, gain)
            startedNote.sourceNode.start()
        }

        return {
            startNote,
            startedNote,
        }
    }

const buildStartImmersiveNote: (parameters: BuildStartImmersiveNoteParameters) => StartImmersiveNoteAndStartedNote =
    (parameters: BuildStartImmersiveNoteParameters): StartImmersiveNoteAndStartedNote => {
        const { timbre, positionNode, webVr, voiceType } = parameters

        const startedNote: StartedImmersiveNote = {}

        const startNote: StartNote = ({ gain, frequency, playbackRate, position }: NoteToPlay): void => {
            startedNote.sourceNode = voiceType === VoiceType.SAMPLE ?
                buildSampleSourceNode(timbre as AudioBuffer, playbackRate, webVr) :
                buildOscillatorSourceNode(timbre as OscillatorType, frequency, webVr)
            startedNote.positionalAudio = buildPositionalAudio(startedNote.sourceNode, positionNode, webVr, position)
            startedNote.gainNode = buildImmersiveGainNode(startedNote.positionalAudio, gain)
            startedNote.sourceNode.start()
        }

        return {
            startNote,
            startedNote,
        }
    }

export {
    buildStartNote,
    buildStartImmersiveNote,
}
