import { Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { buildStartNote, buildStopNote, StopNote, Timbre, VoiceType } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Voice } from '../types'
import { getPeriodicWave, OscillatorName } from './oscillators'
import { getBuffer, SampleName } from './samples'
import { VoiceSpec } from './types'

const constructVoice: (voiceSpec: VoiceSpec) => Promise<Voice> =
    async ({ timbreName, voiceType }: VoiceSpec): Promise<Voice> => {
        const timbre: Timbre = voiceType === VoiceType.SAMPLE ?
            await getBuffer(timbreName as SampleName) :
            getPeriodicWave(timbreName as OscillatorName)

        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        const { startNote, startedNote } = buildStartNote({ timbre, webVr, immersiveAudioEnabled, voiceType })
        const stopNote: StopNote = buildStopNote({ startedNote })

        return { startNote, stopNote }
    }

export {
    constructVoice,
}
