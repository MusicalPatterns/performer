import { from } from '@musical-patterns/utilities'
import { context } from './context'
import { ComputeGainNodeParameters } from './types'

const computeGainNode: (parameters: ComputeGainNodeParameters) => GainNode =
    ({ sourceNode, positionalAudio, gain }: ComputeGainNodeParameters): GainNode => {
        let gainNode: GainNode
        if (positionalAudio) {
            gainNode = positionalAudio.getOutput()
            positionalAudio.setVolume(from.Scalar(gain))
        }
        else {
            gainNode = context.createGain()
            sourceNode.connect(gainNode)
            gainNode.connect(context.destination)
            gainNode.gain.value = from.Scalar(gain)
        }

        return gainNode
    }

export {
    computeGainNode,
}
