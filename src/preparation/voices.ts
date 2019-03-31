import { INITIAL, isUndefined, Ms, to } from '@musical-patterns/utilities'
import { SourceType } from '../performance'
import { StateKey, store } from '../state'
import { PreparedVoice, Sound, Voice } from '../types'
import { computeNextSoundAfterTimePosition } from './nextSoundAfterTimePosition'
import { OscillatorName } from './oscillator'
import { applySoundAdjustmentsForPerformer } from './sounds'
import { getSource } from './sources'
import { SourceRequest } from './types'

const defaultSourceRequest: SourceRequest = {
    sourceType: SourceType.OSCILLATOR,
    timbreName: OscillatorName.SINE,
}

const prepareVoices: (voices: Voice[], timePosition?: Ms) => Promise<PreparedVoice[]> =
    async (voices: Voice[], timePosition?: Ms): Promise<PreparedVoice[]> => {
        let timePositionToStartAt: Ms = timePosition || to.Ms(0)
        if (isUndefined(timePosition)) {
            timePositionToStartAt = store.getState()
                .get(StateKey.TIME_POSITION)
        }

        return Promise.all(voices.map(async (voice: Voice): Promise<PreparedVoice> => {
            const { sounds = [], sourceRequest = defaultSourceRequest } = voice
            const adjustedSounds: Sound[] = applySoundAdjustmentsForPerformer(sounds, sourceRequest)

            const { soundIndex, nextStart } = computeNextSoundAfterTimePosition(adjustedSounds, timePositionToStartAt)

            return {
                nextStart,
                nextStop: nextStart,
                soundIndex,
                sounds: adjustedSounds,
                source: await getSource(sourceRequest),
            }
        }))
    }

export {
    prepareVoices,
}
