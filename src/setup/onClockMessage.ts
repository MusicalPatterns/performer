import { apply, Ms, to } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ActionType, ImmutableState, StateKey, store } from '../state'
import { Thread } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        if (state.get(StateKey.PAUSED)) {
            return
        }

        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const clockTimeIncrement: Ms = event.data as Ms
        const newTimePosition: Ms = apply.Translation(timePosition, to.Translation(clockTimeIncrement))
        store.dispatch({ type: ActionType.SET_TIME_POSITION, data: newTimePosition })

        const threads: Thread[] = state.get(StateKey.THREADS)
        threads.forEach((thread: Thread): void => {
            update(thread, newTimePosition)
        })
    }

export {
    onClockMessage,
}
