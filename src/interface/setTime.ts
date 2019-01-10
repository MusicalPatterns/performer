import { Time } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action, store } from '../state'
import { buildSetTimeActions, stopExistingThreads } from './helpers'

const setTime: (time: Time) => Promise<void> =
    async (time: Time): Promise<void> => {
        stopExistingThreads()

        const setTimeActions: Action[] = await buildSetTimeActions(time)
        store.dispatch(batchActions(setTimeActions))
    }

export {
    setTime,
}
