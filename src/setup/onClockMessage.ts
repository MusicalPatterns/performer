import { apply, from, Time, to } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ActionType, ImmutableState, StateKeys, store } from '../state'
import { Thread } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        if (state.get(StateKeys.PAUSED)) {
            return
        }

        const time: Time = state.get(StateKeys.TIME)
        const clockTimeIncrement: Time = event.data as Time
        const newTime: Time = apply.Translation(time, to.Translation(from.Time(clockTimeIncrement)))
        store.dispatch({ type: ActionType.SET_TIME, data: newTime })

        const threads: Thread[] = state.get(StateKeys.THREADS)
        threads.forEach((thread: Thread): void => {
            update(thread, newTime)
        })
    }

export {
    onClockMessage,
}
