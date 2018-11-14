import { from, Scalar } from '../nominal'

const applyScale: <T>(value: T, scalar: Scalar) => T =
    <T>(value: T, scalar: Scalar): T =>
        // @ts-ignore
        value * from.Scalar(scalar) as T

export {
    applyScale,
}
