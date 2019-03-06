import { Ms } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { constructThreads } from '../construction'
import { ActionType, ImmutableState, StateKey, store } from '../state'
import { Thread, ThreadSpec } from '../types'
import { stopExistingThreads } from './helpers'

const setThreadSpecs: (threadSpecs: ThreadSpec[]) => Promise<void> =
    async (threadSpecs: ThreadSpec[]): Promise<void> => {
        stopExistingThreads()

        const state: ImmutableState = store.getState()
        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const threads: Thread[] = await constructThreads(threadSpecs, timePosition)

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_THREAD_SPECS, data: threadSpecs },
            { type: ActionType.SET_THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    setThreadSpecs,
}
