import { context } from '../context'
import { Timbre, VoiceType } from '../types'
import {
    BuildSourceNodeParameters,
    ImmersiveKey,
    PitchKey,
    PitchObject,
    SourceNode,
    SourceNodeBuildingKeys,
    StandardKey,
    TimbreSetterKey,
} from './types'

const buildSourceNode: (parameters: BuildSourceNodeParameters) => SourceNode =
    (parameters: BuildSourceNodeParameters): SourceNode => {
        const { timbre, voiceType, webVr, immersiveAudioEnabled } = parameters

        let sourceNodeBuildingKeys: SourceNodeBuildingKeys
        if (voiceType === VoiceType.SAMPLE) {
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
        const sourceNode: SourceNode = immersiveAudioEnabled ? webVr[ immersiveKey ]() : context[ standardKey ]()
        sourceNode.setBuffer = (buffer: Timbre): void => {
            (sourceNode as AudioBufferSourceNode).buffer = buffer as AudioBuffer
        }

        sourceNode[ timbreSetterKey ](timbre)

        const pitchObject: PitchObject = sourceNode[ pitchKey ]
        // tslint:disable-next-line no-any
        pitchObject.value = parameters[ pitchKey ] as any as number || 1

        return sourceNode
    }

export {
    buildSourceNode,
}
