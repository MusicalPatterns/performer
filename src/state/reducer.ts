import { Reducer } from 'redux'
import { Action, ActionType } from './actions'
import { ImmutableState, initialState, StateKeys } from './state'

const reducer: Reducer<ImmutableState, Action> =
    // tslint:disable-next-line:cyclomatic-complexity
    (state: ImmutableState = initialState, action: Action): ImmutableState => {
        switch (action.type) {
            case ActionType.SET_CLOCK: {
                return state.set(StateKeys.CLOCK, action.data)
            }
            case ActionType.SET_THREADS: {
                return state.set(StateKeys.THREADS, action.data)
            }
            case ActionType.SET_THREAD_SPECS: {
                return state.set(StateKeys.THREAD_SPECS, action.data)
            }
            case ActionType.TOGGLE_PAUSED: {
                return state.set(
                    StateKeys.PAUSED,
                    !state.get(StateKeys.PAUSED),
                )
            }
            case ActionType.SET_TIME: {
                return state.set(StateKeys.TIME, action.data)
            }
            case ActionType.SET_IMMERSIVE_AUDIO_READY: {
                return state.set(StateKeys.IMMERSIVE_AUDIO_READY, true)
            }
            case ActionType.SET_PAUSED: {
                return state.set(StateKeys.PAUSED, action.data)
            }
            case ActionType.SET_WEB_VR: {
                return state.set(StateKeys.WEB_VR, action.data)
            }
            case ActionType.SET_HOME_POSITION: {
                return state.set(StateKeys.HOME_POSITION, action.data)
            }
            case ActionType.SET_SAMPLE_DATA: {
                return state.set(StateKeys.SAMPLE_DATA, action.data)
            }
            case ActionType.TOGGLE_IMMMERSIVE_AUDIO: {
                return state.set(
                    StateKeys.IMMERSIVE_AUDIO,
                    !state.get(StateKeys.IMMERSIVE_AUDIO),
                )
            }

            default: {
                return state
            }
        }
    }

export {
    reducer,
}
