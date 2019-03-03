import { Coordinate, Maybe, Meters, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { VoiceType } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Note } from '../types'
import { applyHomePosition } from './applyHomePosition'
import { applyGainAdjustmentForWebAudioOscillators } from './oscillators'
import { applyPlaybackRate, SampleName } from './samples'
import { VoiceSpec } from './types'

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
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const homePosition: Maybe<Coordinate<Meters, ThreeDimensional>> = state.get(StateKey.HOME_POSITION)
        if (webVr && homePosition) {
            outputNotes = outputNotes.map((note: Note): Note =>
                applyHomePosition(note, homePosition))
        }

        return outputNotes
    }

export {
    constructNotes,
}
