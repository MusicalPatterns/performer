import { to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, store } from '../state'

const stop: VoidFunction =
    (): void => {
        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_TIME, data: to.Time(0) },
            { type: ActionType.SET_PAUSED, data: true },
        ])
        store.dispatch(batchedAction)
    }

export {
    stop,
}
