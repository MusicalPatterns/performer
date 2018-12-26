import { Timbre, VoiceType } from '../../types'
import { context } from '../context'
import {
    BuildSourceNodeParameters,
    SourceNode,
    SourceNodeBuildingKeys,
    SourceNodeImmersiveKey,
    SourceNodePitchKey,
    SourceNodePitchObject,
    SourceNodeStandardKey,
    SourceNodeTimbreSetterKey,
} from './types'

const buildSourceNode: (parameters: BuildSourceNodeParameters) => SourceNode =
    (parameters: BuildSourceNodeParameters): SourceNode => {
        const { timbre, voiceType, webVr } = parameters

        let sourceNodeBuildingKeys: SourceNodeBuildingKeys
        if (voiceType === VoiceType.SAMPLE) {
            sourceNodeBuildingKeys = {
                immersiveKey: SourceNodeImmersiveKey.createSpatialBufferSource,
                pitchKey: SourceNodePitchKey.playbackRate,
                standardKey: SourceNodeStandardKey.createBufferSource,
                timbreSetterKey: SourceNodeTimbreSetterKey.setBuffer,
            }
        }
        else {
            sourceNodeBuildingKeys = {
                immersiveKey: SourceNodeImmersiveKey.createSpatialOscillator,
                pitchKey: SourceNodePitchKey.frequency,
                standardKey: SourceNodeStandardKey.createOscillator,
                timbreSetterKey: SourceNodeTimbreSetterKey.setPeriodicWave,
            }
        }
        const { timbreSetterKey, immersiveKey, standardKey, pitchKey } = sourceNodeBuildingKeys

        // @ts-ignore
        // tslint:disable-next-line:no-unsafe-any
        const sourceNode: SourceNode = webVr ? webVr[ immersiveKey ]() : context[ standardKey ]()
        sourceNode.setBuffer = (buffer: Timbre): void => {
            (sourceNode as AudioBufferSourceNode).buffer = buffer as AudioBuffer
        }

        sourceNode[ timbreSetterKey ](timbre)

        const pitchObject: SourceNodePitchObject = sourceNode[ pitchKey ]
        // tslint:disable-next-line:no-any
        pitchObject.value = parameters[ pitchKey ] as any as number || 1

        return sourceNode
    }

export {
    buildSourceNode,
}
