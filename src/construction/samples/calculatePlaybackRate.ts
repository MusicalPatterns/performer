import { apply, centsToPitch, from, Hz, reciprocal, Scalar, to } from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const calculatePlaybackRate: (sampleData: SampleData, frequency: Hz) => Scalar =
    (sampleData: SampleData, frequency: Hz): Scalar => {
        if (sampleData.unpitched) {
            return to.Scalar(1)
        }

        const pitch: Scalar = to.Scalar(apply.Scalar(
            from.Hz(frequency),
            to.Scalar(from.Hz(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        ))
        const samplePitchAdjustment: Scalar =
            centsToPitch(sampleData.centsAdjustment || to.Cents(0))

        return apply.Scalar(pitch, samplePitchAdjustment)
    }

export {
    calculatePlaybackRate,
}
