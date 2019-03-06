import { Coordinate, Maybe, Meters, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKey, store } from '../state'
import { Note } from '../types'
import { applyHomePosition } from './applyHomePosition'
import { applyGainAdjustmentForWebAudioOscillators } from './oscillators'
import { applyPlaybackRate } from './samples'
import { voiceSpecIsSampleVoiceSpec } from './typeGuards'
import { VoiceSpec } from './types'

const constructNotes: (notes: Note[], options: VoiceSpec) => Note[] =
    (notes: Note[], voiceSpec: VoiceSpec): Note[] => {
        let outputNotes: Note[] = notes
        if (voiceSpecIsSampleVoiceSpec(voiceSpec)) {
            outputNotes = outputNotes.map((note: Note): Note =>
                applyPlaybackRate(note, voiceSpec.timbreName))
        }
        else {
            outputNotes = outputNotes.map(applyGainAdjustmentForWebAudioOscillators)
        }

        const state: ImmutableState = store.getState()
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
