import { to } from '@musical-patterns/utilities'
import { Thread, ThreadSpec } from '../types'
import { constructOscillatorVoice } from './constructOscillatorVoice'
import { constructSampleVoice } from './constructSampleVoice'
import { OscillatorName, SampleName, Voice, VoiceType } from './types'

const constructThreads: (threadSpecs: ThreadSpec[]) => Thread[] =
    (threadSpecs: ThreadSpec[]): Thread[] =>
        threadSpecs.map((threadSpec: ThreadSpec) => {
            const {
                notes = [],
                voiceSpec,
            } = threadSpec

            const {
                timbre = OscillatorName.SQUARE,
                voiceType = VoiceType.OSCILLATOR,
            } = voiceSpec || {}

            const voice: Voice = voiceType === VoiceType.OSCILLATOR ?
                constructOscillatorVoice({ timbre: timbre as OscillatorName }) :
                constructSampleVoice({ timbre: timbre as SampleName })

            return {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                notes,
                voice,
            }
        })

export {
    constructThreads,
}
