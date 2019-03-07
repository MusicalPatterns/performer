import { apply, Ms, to } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Thread } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState()
        if (state.get(StateKey.PAUSED)) {
            return
        }

        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const clockTimeIncrement: Ms = to.Ms(event.data)
        const newTimePosition: Ms = apply.Translation(timePosition, to.Translation(clockTimeIncrement))
        store.dispatch({ type: StateKey.TIME_POSITION, data: newTimePosition })

        const threads: Thread[] = state.get(StateKey.THREADS)
        threads.forEach((thread: Thread): void => {
            update(thread, newTimePosition)
        })
    }

export {
    onClockMessage,
}
