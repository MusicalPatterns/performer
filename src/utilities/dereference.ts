import { from, Index } from '../nominal'

const dereference: <T>(array: T[], index: Index) => T =
    <T>(array: T[], index: Index): T =>
        array[ from.Index(index) ]

export {
    dereference,
}
