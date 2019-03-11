import { isUndefined, Ms, to } from '@musical-patterns/utilities'
import { SourceType } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { PreparedVoice, Sound, Voice } from '../types'
import { calculateNextSoundAfterTimePosition } from './initialSound'
import { OscillatorName } from './oscillators'
import { adjustSoundsForPerformer } from './sounds'
import { getSource } from './source'
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

            const adjustedSounds: Sound[] = adjustSoundsForPerformer(sounds, sourceRequest)

            const { soundIndex, nextStart } = calculateNextSoundAfterTimePosition(adjustedSounds, timePositionToStartAt)

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
