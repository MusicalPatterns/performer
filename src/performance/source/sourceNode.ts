import { keyExistsOnObject } from '@musical-patterns/utilities'
import { context } from '../context'
import { SourceType, Timbre } from '../types'
import {
    BuildSourceNodeParameters,
    ImmersiveKey,
    PitchKey,
    PitchObject,
    SampleSourceNode,
    SetPitchObjectValueParameters,
    SourceNode,
    SourceNodeBuildingKeys,
    StandardKey,
    TimbreSetterKey,
} from './types'

const isSampleSourceNode: (sourceNode: SourceNode) => sourceNode is SampleSourceNode =
    (sourceNode: SourceNode): sourceNode is SampleSourceNode =>
        keyExistsOnObject('buffer', sourceNode)

const setPitchObjectValue: (setupPitchObjectParameters: SetPitchObjectValueParameters) => void =
    ({ sourceNode, pitchKey, buildSourceNodeParameters }: SetPitchObjectValueParameters): void => {
        const pitchObject: PitchObject = sourceNode[ pitchKey ]
        pitchObject.value = buildSourceNodeParameters[ pitchKey ] as unknown as number || 1
    }

const buildSourceNode: (parameters: BuildSourceNodeParameters) => SourceNode =
    (parameters: BuildSourceNodeParameters): SourceNode => {
        const { timbre, sourceType, webVr, immersiveAudioEnabled } = parameters

        let sourceNodeBuildingKeys: SourceNodeBuildingKeys
        if (sourceType === SourceType.SAMPLE) {
            sourceNodeBuildingKeys = {
                immersiveKey: ImmersiveKey.createSpatialBufferSource,
                pitchKey: PitchKey.playbackRate,
                standardKey: StandardKey.createBufferSource,
                timbreSetterKey: TimbreSetterKey.setBuffer,
            }
        }
        else {
            sourceNodeBuildingKeys = {
                immersiveKey: ImmersiveKey.createSpatialOscillator,
                pitchKey: PitchKey.frequency,
                standardKey: StandardKey.createOscillator,
                timbreSetterKey: TimbreSetterKey.setPeriodicWave,
            }
        }
        const { timbreSetterKey, immersiveKey, standardKey, pitchKey } = sourceNodeBuildingKeys

        // @ts-ignore
        const sourceNode: SourceNode = immersiveAudioEnabled && webVr ?
            webVr[ immersiveKey ]() :
            context[ standardKey ]()
        if (isSampleSourceNode(sourceNode)) {
            sourceNode.setBuffer = (buffer: Timbre): void => {
                sourceNode.buffer = buffer as AudioBuffer
            }
        }

        sourceNode[ timbreSetterKey ](timbre)

        setPitchObjectValue({ sourceNode, pitchKey, buildSourceNodeParameters: parameters })

        return sourceNode
    }

export {
    buildSourceNode,
}
