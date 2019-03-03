// tslint:disable no-any

import { applyMiddleware, compose, createStore, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { reducer } from './reducer'
import { initialState } from './state'

const composeEnhancers: any =
    // @ts-ignore
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store: Store = createStore(
    // @ts-ignore
    enableBatching(reducer),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
}
