import { Index, Time } from '@musical-patterns/utilities'
import { VoiceType } from '../performance'
import { OscillatorName } from './oscillators'
import { SampleName } from './samples'

type TimbreName = SampleName | OscillatorName

interface VoiceSpec {
    timbreName: TimbreName,
    voiceType: VoiceType,
}

interface InitialNote {
    nextStart: Time,
    noteIndex: Index,
}

export {
    VoiceSpec,
    TimbreName,
    InitialNote,
}
