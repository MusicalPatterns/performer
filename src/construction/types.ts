import { Ms, Ordinal } from '@musical-patterns/utilities'
import { VoiceType } from '../performance'
import { OscillatorName } from './oscillators'
import { SampleName } from './samples'

type TimbreName = SampleName | OscillatorName

type VoiceSpec = SampleVoiceSpec | OscillatorVoiceSpec

interface SampleVoiceSpec {
    timbreName: SampleName,
    voiceType: VoiceType.SAMPLE,
}

interface OscillatorVoiceSpec {
    timbreName: OscillatorName,
    voiceType: VoiceType.OSCILLATOR,
}

interface InitialNote {
    nextStart: Ms,
    noteIndex: Ordinal,
}

export {
    VoiceSpec,
    TimbreName,
    InitialNote,
    SampleVoiceSpec,
    OscillatorVoiceSpec,
}
