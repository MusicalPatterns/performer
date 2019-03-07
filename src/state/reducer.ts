import { isUndefined } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialState } from './initial'
import { Action, ImmutableState } from './types'

const reducer: Reducer<ImmutableState> =
    (state: ImmutableState = initialState, action: Action): ImmutableState => {
        if (isUndefined(action.data)) {
            return state
        }

        return state.set(action.type, action.data)
    }

export {
    reducer,
}
