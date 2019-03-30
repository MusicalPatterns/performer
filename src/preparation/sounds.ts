import { Coordinate, Maybe, Meters, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKey, store } from '../state'
import { Sound, SoundsSection } from '../types'
import { applyHomePosition } from './applyHomePosition'
import { applyGainScalarForWebAudioOscillators } from './oscillator'
import { applyPlaybackRate } from './sample'
import { sourceRequestIsSampleSourceRequest } from './typeGuards'
import { SourceRequest } from './types'

const applySoundAdjustmentsForPerformer: (sections: SoundsSection[], options: SourceRequest) => SoundsSection[] =
    (sections: SoundsSection[], sourceRequest: SourceRequest): SoundsSection[] => {
        let outputSections: SoundsSection[] = sections
        if (sourceRequestIsSampleSourceRequest(sourceRequest)) {
            outputSections = outputSections.map((outputSection: SoundsSection) => ({
                ...outputSection,
                sounds: outputSection.sounds.map((sound: Sound): Sound =>
                    applyPlaybackRate(sound, sourceRequest.timbreName),
                ),
            }))
        }
        else {
            outputSections = outputSections.map((outputSection: SoundsSection) => ({
                ...outputSection,
                sounds: outputSection.sounds.map(applyGainScalarForWebAudioOscillators),
            }))
        }

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const homePosition: Maybe<Coordinate<Meters, ThreeDimensional>> = state.get(StateKey.HOME_POSITION)
        if (webVr && homePosition) {
            outputSections = outputSections.map((outputSection: SoundsSection) => ({
                ...outputSection,
                sounds: outputSection.sounds.map((sound: Sound): Sound =>
                    applyHomePosition(sound, homePosition),
                ),
            }))
        }

        return outputSections
    }

export {
    applySoundAdjustmentsForPerformer,
}
