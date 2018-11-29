import { OscillatorName, SampleName, ThreadSpec, to, VoiceType } from '@musical-patterns/utilities'
import { Thread } from '../types'
import { constructOscillatorVoice } from './constructOscillatorVoice'
import { constructSampleVoice } from './constructSampleVoice'
import { Voice } from './types'

const constructThreads: (threadSpecs: ThreadSpec[]) => Thread[] =
    (threadSpecs: ThreadSpec[]): Thread[] =>
        threadSpecs.map(({ part, voiceSpec }: ThreadSpec) => {
            const { spatialization, timbre, voiceType } = voiceSpec
            const voice: Voice = voiceType === VoiceType.OSCILLATOR ?
                constructOscillatorVoice({ spatialization, timbre: timbre as OscillatorName }) :
                constructSampleVoice({ spatialization, timbre: timbre as SampleName })

            return {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                part,
                voice,
            }
        })

export {
    constructThreads,
}
