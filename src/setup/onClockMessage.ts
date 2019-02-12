import { apply, from, Ms, to } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { Thread } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        if (state.get(StateKeys.PAUSED)) {
            return
        }

        const timePosition: Ms = state.get(StateKeys.TIME_POSITION)
        const clockTimeIncrement: Ms = event.data as Ms
        const newTimePosition: Ms = apply.Translation(timePosition, to.Translation(clockTimeIncrement))
        store.dispatch({ type: ActionType.SET_TIME_POSITION, data: newTimePosition })

        const threads: Thread[] = state.get(StateKeys.THREADS)
        threads.forEach((thread: Thread): void => {
            update(thread, newTimePosition)
        })
    }

export {
    onClockMessage,
}
