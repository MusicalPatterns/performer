import { Time } from '@musical-patterns/utilities'
import { constructThreads } from '../../construction'
import { ActionType, ImmutableState, StateKeys, store } from '../../state'
import { Thread, ThreadSpec } from '../../types'
import { stopExistingThreads } from './stopExistingThreads'

let previousImmersiveAudio: boolean = false

const handleImmersiveAudioChange: () => Promise<void> =
    async (): Promise<void> => {
        const state: ImmutableState = store.getState() as ImmutableState
        const immersiveAudio: boolean = state.get(StateKeys.IMMERSIVE_AUDIO)

        if (immersiveAudio !== previousImmersiveAudio) {
            previousImmersiveAudio = immersiveAudio
            stopExistingThreads()

            const threadSpecs: ThreadSpec[] = state.get(StateKeys.THREAD_SPECS)
            const time: Time = state.get(StateKeys.TIME)
            const threads: Thread[] = await constructThreads(threadSpecs, time)

            store.dispatch({ type: ActionType.SET_THREADS, data: threads })
        }
    }

export {
    handleImmersiveAudioChange,
}
