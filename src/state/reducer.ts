import { Reducer } from 'redux'
import { from, Time , to } from '../nominal'
import { applyOffset } from '../utilities'
import { Action, ActionType } from './actions'
import { initialState } from './initialState'
import { stopThreads, terminateClock, updateThreads } from './sideEffects'
import { ImmutableState, StateKeys } from './state'

const reducer: Reducer<ImmutableState, Action> =
    // tslint:disable-next-line:cyclomatic-complexity
    (state: ImmutableState = initialState, action: Action): ImmutableState => {
        switch (action.type) {
            case ActionType.SET_THREADS: {
                stopThreads(state.get(StateKeys.THREADS))

                return state.set(StateKeys.THREADS, action.data)
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
            case ActionType.SET_ATOMIC_TIME: {
                return state.set(StateKeys.ATOMIC_TIME, action.data)
            }
            case ActionType.SET_RAW_TIME: {
                return state.set(StateKeys.RAW_TIME, action.data)
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

                const incrementedAtomicTime: Time = applyOffset(
                    state.get(StateKeys.ATOMIC_TIME),
                    to.Offset(1),
                )
                const incrementedRawTime: Time = applyOffset(
                    state.get(StateKeys.RAW_TIME),
                    to.Offset(from.Time(action.data)),
                )

                updateThreads(
                    state.get(StateKeys.THREADS),
                    state.get(StateKeys.RAW_TIME),
                    incrementedAtomicTime,
                )

                return state
                    .set(StateKeys.ATOMIC_TIME, incrementedAtomicTime)
                    .set(StateKeys.RAW_TIME, incrementedRawTime)
            }

            default: {
                return state
            }
        }
    }

export {
    reducer,
}
