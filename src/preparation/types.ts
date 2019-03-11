import { Ms, Ordinal } from '@musical-patterns/utilities'
import { SourceType } from '../performance'
import { OscillatorName } from './oscillators'
import { SampleName } from './samples'

type TimbreName = SampleName | OscillatorName

type SourceRequest = SampleSourceRequest | OscillatorSourceRequest

interface SampleSourceRequest {
    sourceType: SourceType.SAMPLE,
    timbreName: SampleName,
}

interface OscillatorSourceRequest {
    sourceType: SourceType.OSCILLATOR,
    timbreName: OscillatorName,
}

interface NextSound {
    nextStart: Ms,
    soundIndex: Ordinal,
}

export {
    SourceRequest,
    TimbreName,
    NextSound,
    SampleSourceRequest,
    OscillatorSourceRequest,
}
