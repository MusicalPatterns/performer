import * as React from 'react'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Thread } from '../index'
import { to } from '../nominal'
import { ActionType, store } from '../state'

const restart: (threads: Thread[]) => void =
    (threads: Thread[]): void => {
        // tslint:disable-next-line:no-unsafe-any
        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_ATOMIC_TIME, data: to.Time(0) },
            { type: ActionType.SET_RAW_TIME, data: to.Time(0) },
            { type: ActionType.SET_THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    restart,
}
