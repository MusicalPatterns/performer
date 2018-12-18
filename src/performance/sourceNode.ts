import { DictionaryOf } from '@musical-patterns/utilities'
import { SourceNode, SourceNodeKey, VoiceType } from '../construction'
import { context } from './context'
import { BuildSourceNodeParameters } from './types'

const buildSourceNode: (parameters: BuildSourceNodeParameters) => SourceNode =
    (parameters: BuildSourceNodeParameters): SourceNode => {
        const { timbre, voiceType, webVr } = parameters

        let sourceNodeBuildingKeys: DictionaryOf<string>
        if (voiceType === VoiceType.SAMPLE) {
            sourceNodeBuildingKeys = {
                immersiveKey: 'createSpatialBufferSource',
                pitchKey: 'playbackRate',
                standardKey: 'createBufferSource',
                timbreKey: 'buffer',
            }
        }
        else {
            sourceNodeBuildingKeys = {
                immersiveKey: 'createSpatialOscillator',
                pitchKey: 'frequency',
                standardKey: 'createOscillator',
                timbreKey: 'type',
            }
        }
        const { timbreKey, immersiveKey, standardKey, pitchKey } = sourceNodeBuildingKeys

        // @ts-ignore
        // tslint:disable-next-line:no-unsafe-any
        const sourceNode: SourceNode = webVr ? webVr[ immersiveKey ]() : context[ standardKey ]()
        sourceNode[ timbreKey ] = timbre as SourceNodeKey
        sourceNode[ pitchKey ].value = parameters[ pitchKey ] as number || 1

        return sourceNode
    }

export {
    buildSourceNode,
}
