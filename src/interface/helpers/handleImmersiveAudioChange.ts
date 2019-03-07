import { Ms } from '@musical-patterns/utilities'
import { constructThreads } from '../../construction'
import { ImmutableState, StateKey, store } from '../../state'
import { Thread, ThreadSpec } from '../../types'
import { stopExistingThreads } from './stopExistingThreads'

let previousImmersiveAudioEnabled: boolean = false

const handleImmersiveAudioChange: () => Promise<void> =
    async (): Promise<void> => {
        const state: ImmutableState = store.getState()
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        if (immersiveAudioEnabled !== previousImmersiveAudioEnabled) {
            previousImmersiveAudioEnabled = immersiveAudioEnabled
            stopExistingThreads()

            const threadSpecs: ThreadSpec[] = state.get(StateKey.THREAD_SPECS)
            const timePosition: Ms = state.get(StateKey.TIME_POSITION)
            const threads: Thread[] = await constructThreads(threadSpecs, timePosition)

            store.dispatch({ type: StateKey.THREADS, data: threads })
        }
    }

export {
    handleImmersiveAudioChange,
}
