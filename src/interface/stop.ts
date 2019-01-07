import { to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { Thread } from '../types'

const stop: VoidFunction =
    (): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        const threads: Thread[] = state.get(StateKeys.THREADS)

        threads.forEach((thread: Thread) => {
            thread.voice.stopNote()
        })

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_TIME, data: to.Time(0) },
            { type: ActionType.SET_PAUSED, data: true },
        ])
        store.dispatch(batchedAction)
    }

export {
    stop,
}
