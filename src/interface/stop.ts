import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType, store } from '../state'
import { buildSetTimeActions, stopExistingThreads } from './helpers'

const stop: () => Promise<void> =
    async (): Promise<void> => {
        stopExistingThreads()

        const setTimeActions: Action[] = await buildSetTimeActions(BEGINNING)
        const actions: Action[] = setTimeActions.concat([
            { type: ActionType.SET_PAUSED, data: true },
        ])
        const batchedAction: BatchAction = batchActions(actions)
        store.dispatch(batchedAction)
    }

export {
    stop,
}
