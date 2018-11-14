import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { buildClock } from '../performance'
import { ActionType, ImmutableState, StateKeys } from '../state'
import { doAsync } from '../utilities'
import {
    ThreadsListenerProps,
    ThreadsListenerPropsFromDispatch,
    ThreadsListenerPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => ThreadsListenerPropsFromState =
    (state: ImmutableState): ThreadsListenerPropsFromState => ({
        threads: state.get(StateKeys.THREADS),
    })

const mapDispatchToProps: (dispatch: Dispatch) => ThreadsListenerPropsFromDispatch =
    (dispatch: Dispatch): ThreadsListenerPropsFromDispatch => ({
        resetClock: (): void => {
            dispatch({ type: ActionType.SET_CLOCK, data: buildClock(dispatch) })
        },
    })

const ThreadsListener: (threadsChangeListenerProps: ThreadsListenerProps) => JSX.Element =
    ({ threads, resetClock }: ThreadsListenerProps): JSX.Element => {
        doAsync(resetClock)

        return <div/>
    }

// tslint:disable-next-line:no-any
export default connect(mapStateToProps, mapDispatchToProps)(ThreadsListener as any)
