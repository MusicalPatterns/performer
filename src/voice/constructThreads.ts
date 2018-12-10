import { Coordinate, Maybe, to } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKeys, store } from '../state'
import { Note, Thread, ThreadSpec } from '../types'
import { constructOscillatorVoice, constructSampleVoice } from '../voice'
import { applyHomePosition } from './applyHomePosition'
import { applyPlaybackRate } from './applyPlaybackRate'
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

            if (voiceType === VoiceType.SAMPLE) {
                notes.map((note: Note): void => {
                    applyPlaybackRate(note, timbre as SampleName)
                })
            }

            const state: ImmutableState = store.getState() as ImmutableState
            const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)
            const homePosition: Maybe<Coordinate> = state.get(StateKeys.HOME_POSITION)
            if (webVr && homePosition) {
                notes.map((note: Note): void => {
                    applyHomePosition(note, homePosition)
                })
            }

            return {
                nextEnd: to.Time(0),
                nextStart: to.Time(0),
                noteIndex: to.Index(0),
                notes,
                voice,
            }
        }))

export {
    constructThreads,
}
