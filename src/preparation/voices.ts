import { Ms, to } from '@musical-patterns/utilities'
import { SourceType } from '../performance'
import { PreparedVoice, Sound, Voice } from '../types'
import { calculateInitialSound } from './initialSound'
import { OscillatorName } from './oscillators'
import { adjustSoundsForPerformer } from './sounds'
import { getSource } from './source'
import { SourceRequest } from './types'

const defaultSourceRequest: SourceRequest = {
    sourceType: SourceType.OSCILLATOR,
    timbreName: OscillatorName.SINE,
}

const prepareVoices: (voices: Voice[], startTime?: Ms) => Promise<PreparedVoice[]> =
    async (voices: Voice[], startTime: Ms = to.Ms(0)): Promise<PreparedVoice[]> =>
        Promise.all(voices.map(async (voice: Voice): Promise<PreparedVoice> => {
            const { sounds = [], sourceRequest = defaultSourceRequest } = voice

            const adjustedSounds: Sound[] = adjustSoundsForPerformer(sounds, sourceRequest)

            const { soundIndex, nextStart } = calculateInitialSound(adjustedSounds, startTime)

            return {
                nextStart,
                nextStop: nextStart,
                soundIndex,
                sounds: adjustedSounds,
                source: await getSource(sourceRequest),
            }
        }))

export {
    prepareVoices,
}
