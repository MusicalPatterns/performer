import { noop } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildVrb, Vrb } from 'vrb'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { handleImmersiveAudioChange } from './helpers'
import { BuildToggleImmersiveAudioParameters, EnableImmersiveAudioParameters } from './types'

const buildToggleImmersiveAudio: ({ vrb }: BuildToggleImmersiveAudioParameters) => VoidFunction =
    ({ vrb }: BuildToggleImmersiveAudioParameters): VoidFunction =>
        (): void => {
            const state: ImmutableState = store.getState() as ImmutableState
            const immersiveAudioReady: boolean = state.get(StateKeys.IMMERSIVE_AUDIO_READY)
            if (!immersiveAudioReady) {
                return
            }

            store.dispatch({ type: ActionType.TOGGLE_IMMMERSIVE_AUDIO })
            vrb.toggleVr()
        }

const enableImmersiveAudio: (enableImmersiveAudioParameters?: EnableImmersiveAudioParameters) => VoidFunction =
    ({ homePosition, vrb, onReady = noop, onNoVr = noop }: EnableImmersiveAudioParameters = {}): VoidFunction => {
        let webVr: Vrb
        if (vrb) {
            webVr = vrb
        }
        else {
            webVr = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
                onNoVr,
                onReady: (): void => {
                    store.dispatch({ type: ActionType.SET_IMMERSIVE_AUDIO_READY })
                    onReady()
                },
            })
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_WEB_VR, data: webVr },
            { type: ActionType.SET_HOME_POSITION, data: homePosition },
        ])
        store.dispatch(batchedAction)

        store.subscribe(handleImmersiveAudioChange)

        return buildToggleImmersiveAudio({ vrb: webVr })
    }

export {
    enableImmersiveAudio,
}
