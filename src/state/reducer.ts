import { apply, from, Time, to } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { buildClock } from '../performance'
import { Action, ActionType } from './actions'
import { stopThreads, terminateClock, updateThreads } from './sideEffects'
import { ImmutableState, initialState, StateKeys } from './state'
import { store } from './store'

const reducer: Reducer<ImmutableState, Action> =
    // tslint:disable-next-line:cyclomatic-complexity
    (state: ImmutableState = initialState, action: Action): ImmutableState => {
        switch (action.type) {
            case ActionType.SET_THREADS: {
                stopThreads(state.get(StateKeys.THREADS))

                return state.set(StateKeys.THREADS, action.data)
                    .set(StateKeys.CLOCK, buildClock(store.dispatch))
            }
            case ActionType.TOGGLE_PAUSED: {
                return state.set(
                    StateKeys.PAUSED,
                    !state.get(StateKeys.PAUSED),
                )
            }
            case ActionType.SET_CLOCK: {
                terminateClock(state.get(StateKeys.CLOCK))

                return state.set(StateKeys.CLOCK, action.data)
            }
            case ActionType.SET_TIME: {
                return state.set(StateKeys.TIME, action.data)
            }
            case ActionType.SET_PAUSED: {
                return state.set(StateKeys.PAUSED, action.data)
            }
            case ActionType.SET_SCENE: {
                return state.set(StateKeys.SCENE, action.data)
            }
            case ActionType.SET_WEB_VR: {
                return state.set(StateKeys.WEB_VR, action.data)
            }
            case ActionType.INCREMENT_TIME: {
                if (state.get(StateKeys.PAUSED)) {
                    return state
                }

                const time: Time = apply.Offset(state.get(StateKeys.TIME), to.Offset(from.Time(action.data)))

                updateThreads(state.get(StateKeys.THREADS), time)

                return state
                    .set(StateKeys.TIME, time)
            }

            default: {
                return state
            }
        }
    }

export {
    reducer,
}
