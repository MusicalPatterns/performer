import { noop } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildVrb, Vrb } from 'vrb'
import { StateKey, store } from '../state'
import { handleImmersiveAudioChange } from './helpers'
import {
    BuildToggleImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    ToggleImmersiveAudioHandlers,
} from './types'

const buildToggleImmersiveAudio: ({ vrb }: BuildToggleImmersiveAudioParameters) => ToggleImmersiveAudioHandlers =
    ({ vrb }: BuildToggleImmersiveAudioParameters): ToggleImmersiveAudioHandlers => ({
        enterImmersiveAudio: (): void => {
            const immersiveAudioReady: boolean = store.getState()
                .get(StateKey.IMMERSIVE_AUDIO_READY)
            if (!immersiveAudioReady) {
                return
            }

            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_ENABLED, data: true })
            vrb.toggleVr()
        },
        exitImmersiveAudio: (): void => {
            const immersiveAudioReady: boolean = store.getState()
                .get(StateKey.IMMERSIVE_AUDIO_READY)
            if (!immersiveAudioReady) {
                return
            }

            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_ENABLED, data: false })
            vrb.toggleVr()
        },
    })

const enableImmersiveAudio:
    (enableImmersiveAudioParameters?: EnableImmersiveAudioParameters) => ToggleImmersiveAudioHandlers =
    (enableImmersiveAudioParameters: EnableImmersiveAudioParameters = {}): ToggleImmersiveAudioHandlers => {
        const { homePosition, vrb, onReady = noop, onNoVr = noop } = enableImmersiveAudioParameters
        let webVr: Vrb
        if (vrb) {
            webVr = vrb
            const oldOnReady: VoidFunction = webVr.onReady
            webVr.onReady = (): void => {
                store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_READY, data: true })
                oldOnReady()
            }
        }
        else {
            webVr = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
                onNoVr,
                onReady: (): void => {
                    store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_READY, data: true })
                    onReady()
                },
            })
        }

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.WEB_VR, data: webVr },
            { type: StateKey.HOME_POSITION, data: homePosition },
        ])
        store.dispatch(batchedAction)

        store.subscribe(handleImmersiveAudioChange)

        return buildToggleImmersiveAudio({ vrb: webVr })
    }

export {
    enableImmersiveAudio,
}
