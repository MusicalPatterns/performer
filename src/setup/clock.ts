import { Maybe } from '@musical-patterns/utilities'
import { ActionType, ImmutableState, StateKey, store } from '../state'
import { onClockMessage } from './onClockMessage'

const setupClock: VoidFunction =
    (): void => {
        const state: ImmutableState = store.getState() as ImmutableState
        const oldClock: Maybe<Worker> = state.get(StateKey.CLOCK)
        if (oldClock) {
            oldClock.terminate()
        }

        // @ts-ignore
        // tslint:disable-next-line
        const Clock = require('./clock.worker')
        const clock: Worker = new Clock()
        clock.onmessage = onClockMessage

        store.dispatch({ type: ActionType.SET_CLOCK, data: clock })
    }

export {
    setupClock,
}
