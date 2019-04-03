import { apply, difference, Ms, sum, to } from '@musical-patterns/utilities'
import { ComputePatternTimeParameters } from './types'

const computePatternTime: (parameters: { segnoTime: Ms, timePosition: Ms, totalDuration: Ms }) => Ms =
    ({ timePosition, totalDuration, segnoTime }: ComputePatternTimeParameters): Ms => {
        const repetendDuration: Ms = difference(totalDuration, segnoTime)

        if (timePosition < totalDuration) {
            return timePosition
        }

        const introDuration: Ms = difference(totalDuration, repetendDuration)
        const timeWithinRepetend: Ms = apply.Modulus(
            difference(timePosition, introDuration),
            to.Modulus(repetendDuration),
        )

        return sum(
            introDuration,
            timeWithinRepetend,
        )
    }

export {
    computePatternTime,
}
