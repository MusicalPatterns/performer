import { Ms, Ordinal } from '@musical-patterns/utilities'
import { VoiceType } from '../performance'
import { OscillatorName } from './oscillators'
import { SampleName } from './samples'

type TimbreName = SampleName | OscillatorName

interface VoiceSpec {
    timbreName: TimbreName,
    voiceType: VoiceType,
}

interface InitialNote {
    nextStart: Ms,
    noteIndex: Ordinal,
}

export {
    VoiceSpec,
    TimbreName,
    InitialNote,
}
