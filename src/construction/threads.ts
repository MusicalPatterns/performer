import { Time, to } from '@musical-patterns/utilities'
import { VoiceType } from '../performance'
import { Note, Thread, ThreadSpec } from '../types'
import { calculateInitialNote } from './initialNote'
import { constructNotes } from './notes'
import { OscillatorName } from './oscillators'
import { VoiceSpec } from './types'
import { constructVoice } from './voice'

const defaultVoiceSpec: VoiceSpec = {
    timbreName: OscillatorName.SINE,
    voiceType: VoiceType.OSCILLATOR,
}

const constructThreads: (threadSpecs: ThreadSpec[], startTime?: Time) => Promise<Thread[]> =
    async (threadSpecs: ThreadSpec[], startTime: Time = to.Time(0)): Promise<Thread[]> =>
        Promise.all(threadSpecs.map(async (threadSpec: ThreadSpec): Promise<Thread> => {
            const { notes = [], voiceSpec = defaultVoiceSpec } = threadSpec

            const constructedNotes: Note[] = constructNotes(notes, voiceSpec)

            const { noteIndex, nextStart } = calculateInitialNote(constructedNotes, startTime)

            return {
                nextEnd: nextStart,
                nextStart,
                noteIndex,
                notes: constructedNotes,
                voice: await constructVoice(voiceSpec),
            }
        }))

export {
    constructThreads,
}
