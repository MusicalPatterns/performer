import { from } from '@musical-patterns/utilities'
import { context } from './context'
import { BuildGainNodeParameters, BuildImmersiveGainNodeParameters } from './types'

const buildGainNode: (parameters: BuildGainNodeParameters) => GainNode =
    ({ sourceNode, gain }: BuildGainNodeParameters): GainNode => {
        const gainNode: GainNode = context.createGain()
        sourceNode.connect(gainNode)
        gainNode.connect(context.destination)
        gainNode.gain.value = from.Scalar(gain)

        return gainNode
    }

const buildImmersiveGainNode: (parameters: BuildImmersiveGainNodeParameters) => GainNode =
    ({ positionalAudio, gain }: BuildImmersiveGainNodeParameters): GainNode => {
        const gainNode: GainNode = positionalAudio.getOutput()
        positionalAudio.setVolume(from.Scalar(gain))

        return gainNode
    }

export {
    buildGainNode,
    buildImmersiveGainNode,
}
