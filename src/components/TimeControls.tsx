import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { from } from '../nominal'
import { ActionType, ImmutableState, StateKeys } from '../state'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TimeControlsPropsFromState =
    (state: ImmutableState): TimeControlsPropsFromState => ({
        paused: state.get(StateKeys.PAUSED),
        time: state.get(StateKeys.TIME),
    })

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        togglePaused: (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
        },
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    ({ time, togglePaused, paused }: TimeControlsProps): JSX.Element => {
        const control: string = paused ? 'play' : 'pause'

        return (
            <div>
                <div {...{ id: control, onClick: togglePaused }}>{control}</div>
                <div {...{ id: 'secret-timer' }}>{Math.round(from.Time(time))}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
