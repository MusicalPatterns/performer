import { Maybe } from '@musical-patterns/utilities'
import { Object3D } from 'three'
import { Vrb } from 'vrb'
import { buildStartNote, buildStopNote, StopNote } from '../performance'
import { ImmutableState, StateKeys, store } from '../state'
import { oscillatorNameToTypeMap } from './oscillatorNameToTypeMap'
import { getOrLoad } from './samples'
import { OscillatorName, SampleName, Timbre, Voice, VoiceSpec, VoiceType } from './types'

const constructVoice: (voiceSpec: VoiceSpec) => Promise<Voice> =
    async ({ timbreName, voiceType }: VoiceSpec): Promise<Voice> => {
        const timbre: Timbre = voiceType === VoiceType.SAMPLE ?
            await getOrLoad(timbreName as SampleName) :
            oscillatorNameToTypeMap[ timbreName as OscillatorName ] as OscillatorType

        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)

        const { startNote, startedNote } = buildStartNote({ timbre, webVr, voiceType })
        const stopNote: StopNote = buildStopNote({ startedNote })

        return { startNote, stopNote }
    }

export {
    constructVoice,
}