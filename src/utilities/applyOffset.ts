import { from, Offset } from '@musical-patterns/utilities'

const applyOffset: <T>(value: T, offsetAmount: Offset) => T =
    <T>(value: T, offsetAmount: Offset): T =>
        // @ts-ignore
        value + from.Offset(offsetAmount) as T

export {
    applyOffset,
}
