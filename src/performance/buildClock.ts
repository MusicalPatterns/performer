import { Dispatch } from 'redux'
import { ActionType } from '../state'
import * as Clock from './clock.worker'

const buildClock: (dispatch: Dispatch) => Worker =
    (dispatch: Dispatch): Worker => {
        // tslint:disable-next-line:no-unsafe-any
        const clock: Worker = new Clock.default()
        clock.onmessage = (event: MessageEvent): void => {
            dispatch({ type: ActionType.INCREMENT_TIME, data: event.data })
        }

        return clock
    }

export {
    buildClock,
}
