import { buildClock } from '../performance'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { Thread } from '../types'
import { deepEqual } from '../utilities'

const setupThreadsListener: VoidFunction =
    (): void => {
        let previousThreads: Thread[]
        store.subscribe((): void => {
            const state: ImmutableState = store.getState() as ImmutableState
            const threads: Thread[] = state.get(StateKeys.THREADS)

            if (!deepEqual(threads, previousThreads)) {
                previousThreads = threads
                store.dispatch({ type: ActionType.SET_CLOCK, data: buildClock(store.dispatch) })
            }
        })
    }

export {
    setupThreadsListener,
}
