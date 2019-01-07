import { BEGINNING, to } from '@musical-patterns/utilities'
import { VoiceType } from '../performance'
import { Thread, ThreadSpec } from '../types'
import { constructNotes } from './notes'
import { OscillatorName } from './oscillators'
import { VoiceSpec } from './types'
import { constructVoice } from './voice'

const defaultVoiceSpec: VoiceSpec = {
    timbreName: OscillatorName.SINE,
    voiceType: VoiceType.OSCILLATOR,
}

const constructThreads: (threadSpecs: ThreadSpec[]) => Promise<Thread[]> =
    async (threadSpecs: ThreadSpec[]): Promise<Thread[]> =>
        Promise.all(threadSpecs.map(async (threadSpec: ThreadSpec): Promise<Thread> => {
            const { notes = [], voiceSpec = defaultVoiceSpec } = threadSpec

            return {
                nextEnd: BEGINNING,
                nextStart: BEGINNING,
                noteIndex: to.Index(0),
                notes: constructNotes(notes, voiceSpec),
                voice: await constructVoice(voiceSpec),
            }
        }))

export {
    constructThreads,
}
