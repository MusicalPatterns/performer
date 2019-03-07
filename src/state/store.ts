// tslint:disable no-any

import { applyMiddleware, compose, createStore, Store } from 'redux'
import { BatchAction, batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { initialState } from './initial'
import { reducer } from './reducer'
import { Action, ImmutableState } from './types'

// @ts-ignore
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<ImmutableState, Action | BatchAction> = createStore(
    enableBatching(reducer),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
}
