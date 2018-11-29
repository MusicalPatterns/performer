import { Index, Time } from '@musical-patterns/utilities'
import { Note, Voice, VoiceSpec } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    notes: Note[],
    voice: Voice,
}

interface ThreadSpec {
    notes: Note[],
    voiceSpec: VoiceSpec,
}

export {
    Thread,
    ThreadSpec,
}
