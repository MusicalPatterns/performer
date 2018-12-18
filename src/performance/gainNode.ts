import { from } from '@musical-patterns/utilities'
import { context } from './context'
import { BuildGainNodeParameters } from './types'

const buildGainNode: (parameters: BuildGainNodeParameters) => GainNode =
    ({ sourceNode, positionalAudio, gain }: BuildGainNodeParameters): GainNode => {
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
    buildGainNode,
}
