import { Time } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { constructThreads } from '../construction'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { Thread, ThreadSpec } from '../types'
import { stopExistingThreads } from './helpers'

const setThreadSpecs: (threadSpecs: ThreadSpec[]) => Promise<void> =
    async (threadSpecs: ThreadSpec[]): Promise<void> => {
        stopExistingThreads()

        const state: ImmutableState = store.getState() as ImmutableState
        const time: Time = state.get(StateKeys.TIME)
        const threads: Thread[] = await constructThreads(threadSpecs, time)

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_THREAD_SPECS, data: threadSpecs },
            { type: ActionType.SET_THREADS, data: threads },
        ])
        store.dispatch(batchedAction)
    }

export {
    setThreadSpecs,
}
