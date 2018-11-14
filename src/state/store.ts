// tslint:disable:no-any no-unsafe-any

import { applyMiddleware, compose, createStore, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { initialState } from './initialState'
import { reducer } from './reducer'

// @ts-ignore
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store = createStore(
    enableBatching(reducer),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
}
