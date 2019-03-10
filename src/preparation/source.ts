import { Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { buildStartSound, buildStopSound, StopSound, Timbre } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Source } from '../types'
import { getPeriodicWave } from './oscillators'
import { getBuffer } from './samples'
import { sourceRequestIsSampleSourceRequest } from './typeGuards'
import { SourceRequest } from './types'

const getSource: (sourceRequest: SourceRequest) => Promise<Source> =
    async (sourceRequest: SourceRequest): Promise<Source> => {
        const timbre: Maybe<Timbre> = sourceRequestIsSampleSourceRequest(sourceRequest) ?
            await getBuffer(sourceRequest.timbreName) :
            getPeriodicWave(sourceRequest.timbreName)

        const { sourceType } = sourceRequest

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        const { startSound, startedSound } = buildStartSound({ timbre, webVr, immersiveAudioEnabled, sourceType })
        const stopSound: StopSound = buildStopSound({ startedSound })

        return { startSound, stopSound }
    }

export {
    getSource,
}
