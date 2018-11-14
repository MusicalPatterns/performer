import { CENTS_PER_OCTAVE, OCTAVE } from '../constants'
import { Cents, from, Scalar, to } from '../nominal'
import { applyPower } from './applyPower'

const centsToPitch: (centsToPitch: Cents) => Scalar =
    (cents: Cents): Scalar =>
        applyPower(OCTAVE, to.Power(from.Cents(cents) / from.Cents(CENTS_PER_OCTAVE)))

export {
    centsToPitch,
}
