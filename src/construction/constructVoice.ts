import { Maybe } from '@musical-patterns/utilities'
import { Object3D } from 'three'
import { Vrb } from 'vrb'
import {
    buildStartImmersiveNote,
    buildStartNote,
    buildStopImmersiveNote,
    buildStopNote,
    StopNote,
} from '../performance'
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
        if (webVr) {
            const positionNode: Object3D = new Object3D()
            const { startNote, startedNote } = buildStartImmersiveNote({ timbre, positionNode, webVr, voiceType })
            const stopNote: StopNote = buildStopImmersiveNote({ startedNote, positionNode })

            return { startNote, stopNote }
        }
        else {
            const { startNote, startedNote } = buildStartNote({ timbre, voiceType })
            const stopNote: StopNote = buildStopNote({ startedNote })

            return { startNote, stopNote }
        }
    }

export {
    constructVoice,
}
