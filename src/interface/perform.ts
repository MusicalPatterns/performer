import { to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { constructThreads } from '../construction'
import { ActionType, store } from '../state'
import { Thread, ThreadSpec } from '../types'

const perform: (threadSpecs: ThreadSpec[]) => Promise<void> =
    async (threadSpecs: ThreadSpec[]): Promise<void> => {
        const threads: Thread[] = await constructThreads(threadSpecs)

        store.dispatch({ type: ActionType.SET_THREADS, data: threads })
    }

export {
    perform,
}
