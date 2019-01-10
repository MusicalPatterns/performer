import { ImmutableState, StateKeys, store } from '../../state'
import { Thread } from '../../types'

const stopExistingThreads: () => void =
    (): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        const threads: Thread[] = state.get(StateKeys.THREADS)
        threads.forEach((thread: Thread): void => {
            thread.voice.stopNote()
        })
    }

export {
    stopExistingThreads,
}
