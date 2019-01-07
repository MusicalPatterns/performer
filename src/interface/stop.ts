import { Time } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, store } from '../state'

const stop: (time: Time) => void =
    (time: Time): void => {
        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_TIME, data: time },
            { type: ActionType.SET_PAUSED, data: true },
        ])
        store.dispatch(batchedAction)
    }

export {
    stop,
}
