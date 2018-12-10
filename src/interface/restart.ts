import { to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, store } from '../state'
import { Thread, ThreadSpec } from '../types'
import { constructThreads } from '../voice'

const perform: (threadSpecs: ThreadSpec[]) => void =
    (threadSpecs: ThreadSpec[]): void => {
        const threads: Thread[] = constructThreads(threadSpecs)

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_TIME, data: to.Time(0) },
            { type: ActionType.SET_THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    perform,
}
