import { SourceNode } from './source'
import { BuildStopNoteParameters, StopNote } from './types'

const stopSourceNode: (sourceNode: SourceNode) => void =
    (sourceNode: SourceNode): void => {
        try {
            sourceNode.stop()
            sourceNode.disconnect()
        }
            // tslint:disable-next-line:no-empty
        catch (e) {}
    }

const buildStopNote: (parameters: BuildStopNoteParameters) => StopNote =
    ({ startedNote }: BuildStopNoteParameters): StopNote =>
        (): void => {
            const { sourceNode, gainNode, positionalAudio, positionNode } = startedNote
            if (positionNode && positionalAudio) {
                positionNode.remove(positionalAudio)
            }

            if (sourceNode) {
                stopSourceNode(sourceNode)
            }
            if (gainNode) {
                gainNode.disconnect()
            }
        }

export {
    buildStopNote,
}
