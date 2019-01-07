import { Time } from '@musical-patterns/utilities'
import { ActionType, store } from '../state'

const setTime: (time: Time) => void =
    (time: Time): void => {
        store.dispatch({ type: ActionType.SET_TIME, data: time })
    }

export {
    setTime,
}
