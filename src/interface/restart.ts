import { ThreadSpec, to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { constructThreads } from '../performance'
import { ActionType, store } from '../state'
import { Thread } from '../types'

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
