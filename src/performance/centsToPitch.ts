import { apply, Scalar, to } from '@musical-patterns/shared'
import { CENTS_PER_OCTAVE, OCTAVE } from '../constants'
import { Cents, from as performerFrom } from '../nominal'

const centsToPitch: (centsToPitch: Cents) => Scalar =
    (cents: Cents): Scalar =>
        apply.Power(OCTAVE, to.Power(performerFrom.Cents(cents) / performerFrom.Cents(CENTS_PER_OCTAVE)))

export {
    centsToPitch,
}
