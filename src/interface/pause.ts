import { ActionType, store } from '../state'

const pause: VoidFunction =
    (): void => {
        store.dispatch({ type: ActionType.SET_PAUSED, data: true })
    }

export {
    pause,
}
