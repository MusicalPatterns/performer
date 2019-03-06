import { ImmutableState, StateKey, store } from '../../state'
import { Thread } from '../../types'

const stopExistingThreads: () => void =
    (): void => {
        const state: ImmutableState = store.getState()
        const threads: Thread[] = state.get(StateKey.THREADS)
        threads.forEach((thread: Thread): void => {
            thread.voice.stopNote()
        })
    }

export {
    stopExistingThreads,
}
