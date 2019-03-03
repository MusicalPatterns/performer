import { Ms } from '@musical-patterns/utilities'
import { constructThreads } from '../../construction'
import { Action, ActionType, ImmutableState, StateKey, store } from '../../state'
import { Thread, ThreadSpec } from '../../types'

const buildSetTimeActions: (timePosition: Ms) => Promise<Action[]> =
    async (timePosition: Ms): Promise<Action[]> => {
        const state: ImmutableState = store.getState() as ImmutableState
        const threadSpecs: ThreadSpec[] = state.get(StateKey.THREAD_SPECS)
        const threads: Thread[] = await constructThreads(threadSpecs, timePosition)

        return [
            { type: ActionType.SET_THREADS, data: threads },
            { type: ActionType.SET_TIME_POSITION, data: timePosition },
        ]
    }

export {
    buildSetTimeActions,
}
