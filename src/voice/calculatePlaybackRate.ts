import { apply, centsToPitch, Frequency, from, Scalar, to } from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from '../constants'
import { SampleData } from './types'

const calculatePlaybackRate: (sampleData: SampleData, frequency: Frequency) => Scalar =
    (sampleData: SampleData, frequency: Frequency): Scalar => {
        if (sampleData.unpitched) {
            return to.Scalar(1)
        }

        const pitch: Scalar = to.Scalar(
            from.Frequency(frequency) / from.Frequency(STANDARDIZED_SAMPLE_PITCH_OF_C5),
        )
        const samplePitchAdjustment: Scalar =
            centsToPitch(sampleData.centsAdjustment || to.Cents(0))

        return apply.Scalar(pitch, samplePitchAdjustment)
    }

export {
    calculatePlaybackRate,
}
