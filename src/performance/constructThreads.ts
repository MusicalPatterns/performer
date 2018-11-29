import { to } from '@musical-patterns/utilities'
import { Thread, ThreadSpec } from '../types'
import { constructOscillatorVoice } from './constructOscillatorVoice'
import { constructSampleVoice } from './constructSampleVoice'
import { OscillatorName, SampleName, SpatializationType, Voice, VoiceType } from './types'

const constructThreads: (threadSpecs: ThreadSpec[]) => Thread[] =
    (threadSpecs: ThreadSpec[]): Thread[] =>
        threadSpecs.map(({ notes, voiceSpec }: ThreadSpec) => {
            const {
                spatialization = SpatializationType.MONO,
                timbre = OscillatorName.SQUARE,
                voiceType = VoiceType.OSCILLATOR,
            } = voiceSpec

            const voice: Voice = voiceType === VoiceType.OSCILLATOR ?
                constructOscillatorVoice({ spatialization, timbre: timbre as OscillatorName }) :
                constructSampleVoice({ spatialization, timbre: timbre as SampleName })

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
