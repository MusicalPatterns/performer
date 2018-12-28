import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildVrb, Vrb } from 'vrb'
import { ActionType, store } from '../state'
import { EnableImmersiveAudioParameters } from './types'

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

        return webVr.toggleVr
    }

export {
    enableImmersiveAudio,
}
