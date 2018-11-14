import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Scene } from 'three'
import { buildVrb, Vrb } from 'vrb'
import { ActionType } from '../state'
import { SpatializationEnablerProps } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => SpatializationEnablerProps =
    (dispatch: Dispatch): SpatializationEnablerProps => ({
        onClick: (): void => {
            const scene: Scene = new Scene()
            const webVr: Vrb = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
                scene,
            })

            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_SCENE, data: scene },
                { type: ActionType.SET_WEB_VR, data: webVr },
            ])
            dispatch(batchedAction)

            webVr.requestAnimationFrame()
        },
    })

const SpatializationEnabler: (spatializationEnablerProps: SpatializationEnablerProps) => JSX.Element =
    ({ onClick }: SpatializationEnablerProps): JSX.Element =>
        <div {...{ onClick, id: 'enable-immersive-audio' }}>enable immersive audio</div>

export default connect(undefined, mapDispatchToProps)(SpatializationEnabler)
