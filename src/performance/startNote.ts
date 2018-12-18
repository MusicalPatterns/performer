import { Object3D } from 'three'
import { SourceNode } from '../construction'
import { buildGainNode } from './gainNode'
import { buildPositionalAudio } from './positionalAudio'
import { buildSourceNode } from './sourceNode'
import { BuildStartNoteParameters, NoteToPlay, StartedNote, StartNote, StartNoteAndStartedNote } from './types'

const buildStartNote: (parameters: BuildStartNoteParameters) => StartNoteAndStartedNote =
    (parameters: BuildStartNoteParameters): StartNoteAndStartedNote => {
        const { timbre, webVr, voiceType } = parameters

        const startedNote: StartedNote = {}

        const startNote: StartNote = ({ gain, frequency, playbackRate, position }: NoteToPlay): void => {
            const sourceNode: SourceNode = buildSourceNode({ frequency, playbackRate, timbre, voiceType, webVr })
            startedNote.sourceNode = sourceNode
            if (webVr) {
                const positionNode: Object3D = new Object3D()
                startedNote.positionNode = positionNode
                startedNote.positionalAudio = buildPositionalAudio({ position, positionNode, sourceNode, webVr })
            }
            startedNote.gainNode = buildGainNode({ gain, sourceNode, positionalAudio: startedNote.positionalAudio })
            startedNote.sourceNode.start()
        }

        return {
            startNote,
            startedNote,
        }
    }

export {
    buildStartNote,
}
