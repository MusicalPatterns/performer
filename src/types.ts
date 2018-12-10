import { Index, Time } from '@musical-patterns/utilities'
import { Note } from './performance'
import { Voice, VoiceSpec } from './voice'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    notes: Note[],
    voice: Voice,
}

interface ThreadSpec {
    notes?: Note[],
    voiceSpec?: VoiceSpec,
}

export {
    Thread,
    ThreadSpec,
}
