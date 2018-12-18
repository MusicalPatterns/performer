import { Object3D } from 'three'
import { StartedImmersiveNote, StartedNote } from '../construction'
import { StopNote } from './types'

const buildStopNote: (startedNote: StartedNote) => StopNote =
    (startedNote: StartedNote): StopNote =>
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

const buildStopImmersiveNote: (startedImmersiveNote: StartedImmersiveNote, positionNode: Object3D) => StopNote =
    ({ positionalAudio, sourceNode, gainNode }: StartedImmersiveNote, positionNode: Object3D): StopNote =>
        (): void => {
            if (positionNode && positionalAudio) {
                positionNode.remove(positionalAudio)
            }

            const stopStandardNote: StopNote = buildStopNote({ sourceNode, gainNode })
            stopStandardNote()
        }

export {
    buildStopNote,
    buildStopImmersiveNote,
}
