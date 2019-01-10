import { Time } from '@musical-patterns/utilities'
import { constructThreads } from '../../construction'
import { Action, ActionType, ImmutableState, StateKeys, store } from '../../state'
import { Thread, ThreadSpec } from '../../types'

const buildSetTimeActions: (time: Time) => Promise<Action[]> =
    async (time: Time): Promise<Action[]> => {
        const state: ImmutableState = store.getState() as ImmutableState
        const threadSpecs: ThreadSpec[] = state.get(StateKeys.THREAD_SPECS)
        const threads: Thread[] = await constructThreads(threadSpecs, time)

        return [
            { type: ActionType.SET_THREADS, data: threads },
            { type: ActionType.SET_TIME, data: time },
        ]
    }

export {
    buildSetTimeActions,
}
