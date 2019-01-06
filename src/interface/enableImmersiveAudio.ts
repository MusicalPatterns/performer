import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildVrb, Vrb } from 'vrb'
import { ActionType, store } from '../state'
import { BuildEnterImmersiveAudioParameters, EnableImmersiveAudioParameters } from './types'

const buildEnterImmersiveAudio: ({ vrb }: BuildEnterImmersiveAudioParameters) => VoidFunction =
    ({ vrb }: BuildEnterImmersiveAudioParameters): VoidFunction =>
        (): void => {
            store.dispatch({ type: ActionType.TOGGLE_IMMMERSIVE_AUDIO })
            vrb.toggleVr()
        }

const enableImmersiveAudio: (enableImmersiveAudioParameters?: EnableImmersiveAudioParameters) => VoidFunction =
    ({ homePosition, vrb }: EnableImmersiveAudioParameters = {}): VoidFunction => {
        let webVr: Vrb
        if (vrb) {
            webVr = vrb
        }
        else {
            webVr = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
            })
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_WEB_VR, data: webVr },
            { type: ActionType.SET_HOME_POSITION, data: homePosition },
        ])
        store.dispatch(batchedAction)

        return buildEnterImmersiveAudio({ vrb: webVr })
    }

export {
    enableImmersiveAudio,
}
