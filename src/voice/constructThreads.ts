import { to } from '@musical-patterns/utilities'
import { Thread, ThreadSpec } from '../types'
import { constructOscillatorVoice, constructSampleVoice } from '../voice'
import { constructNotes } from './constructNotes'
import { OscillatorName, SampleName, Voice, VoiceType } from './types'

const constructThreads: (threadSpecs: ThreadSpec[]) => Promise<Thread[]> =
    async (threadSpecs: ThreadSpec[]): Promise<Thread[]> =>
        Promise.all(threadSpecs.map(async (threadSpec: ThreadSpec): Promise<Thread> => {
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
                await constructSampleVoice({ timbre: timbre as SampleName })

            return {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                notes: constructNotes(notes, { voiceType, timbre }),
                voice,
            }
        }))

export {
    constructThreads,
}
