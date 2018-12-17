import { from, Scalar } from '@musical-patterns/utilities'
import { PositionalAudio } from 'three'
import { SourceNode } from '../construction'
import { context } from './context'

const buildGainNode: (sourceNode: SourceNode, gain: Scalar) => GainNode =
    (sourceNode: SourceNode, gain: Scalar): GainNode => {
        const gainNode: GainNode = context.createGain()
        sourceNode.connect(gainNode)
        gainNode.connect(context.destination)
        gainNode.gain.value = from.Scalar(gain)

        return gainNode
    }

const buildImmersiveGainNode: (positionalAudio: PositionalAudio, gain: Scalar) => GainNode =
    (positionalAudio: PositionalAudio, gain: Scalar): GainNode => {
        const gainNode: GainNode = positionalAudio.getOutput()
        positionalAudio.setVolume(from.Scalar(gain))

        return gainNode
    }

export {
    buildGainNode,
    buildImmersiveGainNode,
}
