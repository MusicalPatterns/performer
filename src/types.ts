import { Index, Time } from '@musical-patterns/utilities'
import { Note, Part, Voice, VoiceSpec } from './performance'

interface Thread {
    nextEnd: Time,
    nextStart: Time,
    noteIndex: Index,
    part: Note[],
    voice: Voice,
}

interface ThreadSpec {
    part: Part,
    voiceSpec: VoiceSpec,
}

export {
    Thread,
    ThreadSpec,
}
