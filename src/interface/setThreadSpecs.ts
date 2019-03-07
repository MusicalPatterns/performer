import { Ms } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { constructThreads } from '../construction'
import { ImmutableState, StateKey, store } from '../state'
import { Thread, ThreadSpec } from '../types'
import { stopExistingThreads } from './helpers'

const setThreadSpecs: (threadSpecs: ThreadSpec[]) => Promise<void> =
    async (threadSpecs: ThreadSpec[]): Promise<void> => {
        stopExistingThreads()

        const state: ImmutableState = store.getState()
        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const threads: Thread[] = await constructThreads(threadSpecs, timePosition)

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.THREAD_SPECS, data: threadSpecs },
            { type: StateKey.THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    setThreadSpecs,
}
