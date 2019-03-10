import { Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { buildStartNote, buildStopNote, StopNote, Timbre } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Voice } from '../types'
import { getPeriodicWave } from './oscillators'
import { getBuffer } from './samples'
import { voiceSpecIsSampleVoiceSpec } from './typeGuards'
import { VoiceSpec } from './types'

const constructVoice: (voiceSpec: VoiceSpec) => Promise<Voice> =
    async (voiceSpec: VoiceSpec): Promise<Voice> => {
        const timbre: Maybe<Timbre> = voiceSpecIsSampleVoiceSpec(voiceSpec) ?
            await getBuffer(voiceSpec.timbreName) :
            getPeriodicWave(voiceSpec.timbreName)

        const { voiceType } = voiceSpec

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        const { startNote, startedNote } = buildStartNote({ timbre, webVr, immersiveAudioEnabled, voiceType })
        const stopNote: StopNote = buildStopNote({ startedNote })

        return { startNote, stopNote }
    }

export {
    constructVoice,
}
