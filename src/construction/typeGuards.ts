import { VoiceType } from '../performance'
import { OscillatorVoiceSpec, SampleVoiceSpec, VoiceSpec } from './types'

const voiceSpecIsSampleVoiceSpec: (voiceSpec: VoiceSpec) => voiceSpec is SampleVoiceSpec =
    (voiceSpec: VoiceSpec): voiceSpec is SampleVoiceSpec =>
        voiceSpec.voiceType === VoiceType.SAMPLE

const voiceSpecIsOscillatorVoiceSpec: (voiceSpec: VoiceSpec) => voiceSpec is OscillatorVoiceSpec =
    (voiceSpec: VoiceSpec): voiceSpec is OscillatorVoiceSpec =>
        voiceSpec.voiceType === VoiceType.OSCILLATOR

export {
    voiceSpecIsSampleVoiceSpec,
    voiceSpecIsOscillatorVoiceSpec,
}
