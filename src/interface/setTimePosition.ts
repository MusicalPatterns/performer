import { Ms } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action, store } from '../state'
import { buildSetTimeActions, stopExistingThreads } from './helpers'

const setTimePosition: (timePosition: Ms) => Promise<void> =
    async (timePosition: Ms): Promise<void> => {
        stopExistingThreads()

        const setTimeActions: Action[] = await buildSetTimeActions(timePosition)
        store.dispatch(batchActions(setTimeActions))
    }

export {
    setTimePosition,
}
