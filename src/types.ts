import { Index, Time } from '@musical-patterns/utilities'
import { VoiceSpec } from './construction'
import { NoteToPlay, StartNote, StopNote } from './performance'

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

enum VoiceType {
    OSCILLATOR = 'OSCILLATOR',
    SAMPLE = 'SAMPLE',
}

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

type Timbre = AudioBuffer | PeriodicWave

export {
    Thread,
    ThreadSpec,
    Note,
    VoiceType,
    Voice,
    Timbre,
}
