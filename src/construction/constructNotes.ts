import { Coordinate, Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKeys, store } from '../state'
import { Note } from '../types'
import { applyGainAdjustmentForWebAudioOscillators } from './applyGainAdjustmentForWebAudioOscillators'
import { applyHomePosition } from './applyHomePosition'
import { applyPlaybackRate } from './applyPlaybackRate'
import { SampleName, VoiceSpec, VoiceType } from './types'

const constructNotes: (notes: Note[], options: VoiceSpec) => Note[] =
    (notes: Note[], { voiceType, timbreName }: VoiceSpec): Note[] => {
        let outputNotes: Note[] = notes
        if (voiceType === VoiceType.SAMPLE) {
            outputNotes = outputNotes.map((note: Note): Note =>
                applyPlaybackRate(note, timbreName as SampleName))
        }
        else if (voiceType === VoiceType.OSCILLATOR) {
            outputNotes = outputNotes.map(applyGainAdjustmentForWebAudioOscillators)
        }

        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)
        const homePosition: Maybe<Coordinate> = state.get(StateKeys.HOME_POSITION)
        if (webVr && homePosition) {
            outputNotes = outputNotes.map((note: Note): Note =>
               applyHomePosition(note, homePosition))
        }

        return outputNotes
    }

export {
    constructNotes,
}
