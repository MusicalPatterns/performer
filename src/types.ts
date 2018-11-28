import { Index, Note, Time } from '@musical-patterns/shared'
import { Voice } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    part: Note[],
    voice: Voice,
}

export {
    Thread,
}
