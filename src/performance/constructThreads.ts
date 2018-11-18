import { OscillatorName, SampleName, Thread, ThreadSpec, Voice, VoiceType } from '../index'
import { to } from '../nominal'
import { constructOscillatorVoice } from './constructOscillatorVoice'
import { constructSampleVoice } from './constructSampleVoice'

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
