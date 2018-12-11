import { Index, Time } from '@musical-patterns/utilities'
import { NoteToPlay, Voice, VoiceSpec } from './voice'

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

interface Note extends NoteToPlay {
    duration: Time,
    sustain: Time,
}

export {
    Thread,
    ThreadSpec,
    Note,
}
