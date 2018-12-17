import { Frequency, from, Maybe, Scalar, to } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { context } from './context'

// tslint:disable-next-line:no-type-definitions-outside-types-modules
const buildOscillatorSourceNode: (timbre: OscillatorType, frequency: Frequency, webVr?: Vrb) => OscillatorNode =
    (timbre: OscillatorType, frequency: Frequency, webVr?: Vrb): OscillatorNode => {
        const sourceNode: OscillatorNode = webVr ? webVr.createSpatialOscillator() : context.createOscillator()
        sourceNode.type = timbre
        sourceNode.frequency.value = from.Frequency(frequency)

        return sourceNode
    }

const buildSampleSourceNode: (timbre: AudioBuffer, playbackRate: Maybe<Scalar>, webVr?: Vrb) => AudioBufferSourceNode =
    (timbre: AudioBuffer, playbackRate: Maybe<Scalar> = to.Scalar(1), webVr?: Vrb): AudioBufferSourceNode => {
        const sourceNode: AudioBufferSourceNode = webVr ?
            // tslint:disable-next-line:no-unsafe-any
            webVr.listener.context.createBufferSource() as AudioBufferSourceNode :
            context.createBufferSource()
        sourceNode.buffer = timbre
        sourceNode.playbackRate.value = from.Scalar(playbackRate)

        return sourceNode
    }

export {
    buildOscillatorSourceNode,
    buildSampleSourceNode,
}
