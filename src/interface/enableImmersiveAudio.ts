import { BatchAction, batchActions } from 'redux-batched-actions'
import { Scene } from 'three'
import { buildVrb, Vrb } from 'vrb'
import { ActionType, store } from '../state'
import { EnableImmersiveAudioParameters } from './types'

const enableImmersiveAudio: (enableImmersiveAudioParameters: EnableImmersiveAudioParameters) => void =
    ({ homePosition, vrb }: EnableImmersiveAudioParameters): void => {
        const scene: Scene = new Scene()

        let webVr: Vrb
        if (vrb) {
            webVr = vrb
        }
        else {
            webVr = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
                scene,
            })
            webVr.requestAnimationFrame()
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_SCENE, data: scene },
            { type: ActionType.SET_WEB_VR, data: webVr },
            { type: ActionType.SET_HOME_POSITION, data: homePosition },
        ])
        store.dispatch(batchedAction)
    }

export {
    enableImmersiveAudio,
}
