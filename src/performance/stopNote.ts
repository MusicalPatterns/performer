import { BuildStopImmersiveNoteParameters, BuildStopNoteParameters, StopNote } from './types'

const buildStopNote: (parameters: BuildStopNoteParameters) => StopNote =
    ({ startedNote }: BuildStopNoteParameters): StopNote =>
        (): void => {
            const { sourceNode, gainNode } = startedNote

            if (sourceNode) {
                try {
                    sourceNode.stop()
                    sourceNode.disconnect()
                }
                    // tslint:disable-next-line:no-empty
                catch (e) {
                }
            }
            if (gainNode) {
                gainNode.disconnect()
            }
        }

const buildStopImmersiveNote: (parameters: BuildStopImmersiveNoteParameters) => StopNote =
    ({ startedNote, positionNode }: BuildStopImmersiveNoteParameters): StopNote =>
        (): void => {
            const { positionalAudio } = startedNote
            if (positionNode && positionalAudio) {
                positionNode.remove(positionalAudio)
            }

            const stopStandardNote: StopNote = buildStopNote({ startedNote })
            stopStandardNote()
        }

export {
    buildStopNote,
    buildStopImmersiveNote,
}
