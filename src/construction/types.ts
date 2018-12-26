import { VoiceType } from '../types'
import { OscillatorName } from './oscillators'
import { SampleName } from './samples'

type TimbreName = SampleName | OscillatorName

interface VoiceSpec {
    timbreName: TimbreName,
    voiceType: VoiceType,
}

export {
    VoiceSpec,
    TimbreName,
}
