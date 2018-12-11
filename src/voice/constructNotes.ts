import { Coordinate, Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKeys, store } from '../state'
import { Note } from '../types'
import { applyHomePosition } from './applyHomePosition'
import { applyPlaybackRate } from './applyPlaybackRate'
import { ConstructNotesOptions, SampleName, VoiceType } from './types'

const constructNotes: (notes: Note[], options: ConstructNotesOptions) => Note[] =
    (notes: Note[], { voiceType, timbre }: ConstructNotesOptions): Note[] => {
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

        return notes
    }

export {
    constructNotes,
}
