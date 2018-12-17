import { to } from '@musical-patterns/utilities'
import { Thread, ThreadSpec } from '../types'
import { constructNotes } from './constructNotes'
import { constructVoice } from './constructVoice'
import { OscillatorName, VoiceSpec, VoiceType } from './types'

const defaultVoiceSpec: VoiceSpec = {
    timbreName: OscillatorName.SINE,
    voiceType: VoiceType.OSCILLATOR,
}

const constructThreads: (threadSpecs: ThreadSpec[]) => Promise<Thread[]> =
    async (threadSpecs: ThreadSpec[]): Promise<Thread[]> =>
        Promise.all(threadSpecs.map(async (threadSpec: ThreadSpec): Promise<Thread> => {
            const { notes = [], voiceSpec = defaultVoiceSpec } = threadSpec

            return {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                notes: constructNotes(notes, voiceSpec),
                voice: await constructVoice(voiceSpec),
            }
        }))

export {
    constructThreads,
}
