import * as React from 'react'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Thread, ThreadSpec } from '../index'
import { to } from '../nominal'
import { ActionType, store } from '../state'
import { constructThreads } from './constructThreads'

const restart: (threadSpecs: ThreadSpec[]) => void =
    (threadSpecs: ThreadSpec[]): void => {
        const threads: Thread[] = constructThreads(threadSpecs)

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_TIME, data: to.Time(0) },
            { type: ActionType.SET_THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    restart,
}
