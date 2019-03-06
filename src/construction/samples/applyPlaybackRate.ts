import { Maybe } from '@musical-patterns/utilities'
import { ImmutableState, StateKey, store } from '../../state'
import { Note } from '../../types'
import { calculatePlaybackRate } from './calculatePlaybackRate'
import { SampleDatas, SampleName } from './types'

const applyPlaybackRate: (note: Note, timbreName: SampleName) => Note =
    (note: Note, timbreName: SampleName): Note => {
        const outputNote: Note = note

        const state: ImmutableState = store.getState()
        const sampleData: Maybe<SampleDatas> = state.get(StateKey.SAMPLE_DATA)

        if (sampleData) {
            note.playbackRate = calculatePlaybackRate(sampleData[ timbreName ], note.frequency)
        }

        return outputNote
    }

export {
    applyPlaybackRate,
}
