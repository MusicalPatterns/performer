import { Ordinal, Time } from '@musical-patterns/utilities'
import { VoiceSpec } from './construction'
import { NoteToPlay, StartNote, StopNote } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Ordinal,
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

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

export {
    Thread,
    ThreadSpec,
    Note,
    Voice,
}
