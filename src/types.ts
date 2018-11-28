import { Index, Time, VoiceSpec } from '@musical-patterns/shared'
import { Note, Voice } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    part: Note[],
    voice: Voice,
}

type Part = Note[]

interface ThreadSpec {
    part: Part,
    voiceSpec: VoiceSpec,
}

export {
    Thread,
    Part,
    ThreadSpec,
}
