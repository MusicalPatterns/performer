import { from, Power } from '../nominal'

const applyPower: <T>(base: T, power: Power) => T =
    <T>(base: T, power: Power): T =>
        // @ts-ignore
        Math.pow(base, from.Power(power)) as T

export {
    applyPower,
}
