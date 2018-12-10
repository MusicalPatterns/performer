import { Maybe } from '@musical-patterns/utilities'
import { ImmutableState, StateKeys, store } from '../state'
import { Note } from '../types'
import { calculatePlaybackRate } from './calculatePlaybackRate'
import { SampleDatas, SampleName } from './types'

const applyPlaybackRate: (note: Note, timbre: SampleName) => void =
    (note: Note, timbre: SampleName): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        const sampleData: Maybe<SampleDatas> = state.get(StateKeys.SAMPLE_DATA)

        if (sampleData) {
            note.playbackRate = calculatePlaybackRate(sampleData[ timbre ], note.frequency)
        }
    }

export {
    applyPlaybackRate,
}
