import { Index, Time } from '@musical-patterns/shared'
import { Note, OscillatorName, SampleName, SpatializationType, Voice, VoiceType } from './performance'

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

interface VoiceSpec {
    spatialization?: SpatializationType,
    timbre: SampleName | OscillatorName,
    voiceType: VoiceType,
}

export {
    Thread,
    Part,
    ThreadSpec,
    VoiceSpec,
}
