import { Ms, Ordinal } from '@musical-patterns/utilities'
import { VoiceSpec } from './construction'
import { NoteToPlay, StartNote, StopNote } from './performance'

interface Thread {
    nextEnd: Ms,
    nextStart: Ms,
    noteIndex: Ordinal,
    notes: Note[],
    voice: Voice,
}

interface ThreadSpec {
    notes?: Note[],
    voiceSpec?: VoiceSpec,
}

interface Note extends NoteToPlay {
    duration: Ms,
    sustain: Ms,
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
