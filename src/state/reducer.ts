import { Reducer } from 'redux'
import { Action, ActionMap, ActionType } from './actions'
import { ImmutableState, initialState, StateKey } from './state'

const reducer: Reducer<ImmutableState, Action> =
    (state: ImmutableState = initialState, action: Action): ImmutableState => {
        const actionMap: ActionMap = {
            [ ActionType.SET_CLOCK ]: StateKey.CLOCK,
            [ ActionType.SET_THREADS ]: StateKey.THREADS,
            [ ActionType.SET_THREAD_SPECS ]: StateKey.THREAD_SPECS,
            [ ActionType.SET_TIME_POSITION ]: StateKey.TIME_POSITION,
            [ ActionType.SET_IMMERSIVE_AUDIO_READY ]: StateKey.IMMERSIVE_AUDIO_READY,
            [ ActionType.SET_PAUSED ]: StateKey.PAUSED,
            [ ActionType.SET_WEB_VR ]: StateKey.WEB_VR,
            [ ActionType.SET_HOME_POSITION ]: StateKey.HOME_POSITION,
            [ ActionType.SET_SAMPLE_DATA ]: StateKey.SAMPLE_DATA,
            [ ActionType.SET_IMMERSIVE_AUDIO_ENABLED ]: StateKey.IMMERSIVE_AUDIO_ENABLED,
        }

        return state.set(actionMap[ action.type ], action.data)
    }

export {
    reducer,
}
