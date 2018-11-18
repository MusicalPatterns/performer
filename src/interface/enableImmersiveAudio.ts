import { BatchAction, batchActions } from 'redux-batched-actions'
import { Scene } from 'three'
import { buildVrb, Vrb } from 'vrb'
import { ActionType, store } from '../state'

const enableImmersiveAudio: VoidFunction =
    (): void => {
        const scene: Scene = new Scene()
        const webVr: Vrb = buildVrb({
            camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
            scene,
        })

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_SCENE, data: scene },
            { type: ActionType.SET_WEB_VR, data: webVr },
        ])
        store.dispatch(batchedAction)

        webVr.requestAnimationFrame()
    }

export {
    enableImmersiveAudio,
}
