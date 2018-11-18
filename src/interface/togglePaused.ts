import { ActionType, store } from '../state'

const togglePaused: VoidFunction =
    (): void => {
        store.dispatch({ type: ActionType.TOGGLE_PAUSED })
    }

export {
    togglePaused,
}
