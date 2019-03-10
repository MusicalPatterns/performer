import { Coordinate, Maybe, Meters, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKey, store } from '../state'
import { Sound } from '../types'
import { applyHomePosition } from './applyHomePosition'
import { applyGainAdjustmentForWebAudioOscillators } from './oscillators'
import { applyPlaybackRate } from './samples'
import { sourceRequestIsSampleSourceRequest } from './typeGuards'
import { SourceRequest } from './types'

const adjustSoundsForPerformer: (sounds: Sound[], options: SourceRequest) => Sound[] =
    (sounds: Sound[], sourceRequest: SourceRequest): Sound[] => {
        let outputSounds: Sound[] = sounds
        if (sourceRequestIsSampleSourceRequest(sourceRequest)) {
            outputSounds = outputSounds.map((sound: Sound): Sound =>
                applyPlaybackRate(sound, sourceRequest.timbreName))
        }
        else {
            outputSounds = outputSounds.map(applyGainAdjustmentForWebAudioOscillators)
        }

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const homePosition: Maybe<Coordinate<Meters, ThreeDimensional>> = state.get(StateKey.HOME_POSITION)
        if (webVr && homePosition) {
            outputSounds = outputSounds.map((sound: Sound): Sound =>
                applyHomePosition(sound, homePosition))
        }

        return outputSounds
    }

export {
    adjustSoundsForPerformer,
}
