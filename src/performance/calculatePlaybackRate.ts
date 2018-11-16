import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from '../constants'
import { Frequency, from, Scalar, to } from '../nominal'
import { centsToPitch } from '../utilities'
import { SampleData } from './sampleData'

const calculatePlaybackRate: (sampleData: SampleData, frequency: Frequency) => number =
    (sampleData: SampleData, frequency: Frequency): number => {
        if (sampleData.unpitched) {
            return 1
        }

        const pitch: Scalar = to.Scalar(
            from.Frequency(frequency) / from.Frequency(STANDARDIZED_SAMPLE_PITCH_OF_C5),
        )
        const samplePitchAdjustment: Scalar =
            centsToPitch(sampleData.centsAdjustment || to.Cents(0))

        return from.Scalar(pitch) * from.Scalar(samplePitchAdjustment)
    }

export {
    calculatePlaybackRate,
}
