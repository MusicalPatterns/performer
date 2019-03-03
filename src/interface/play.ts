import { ActionType, store } from '../state'

const play: VoidFunction =
    (): void => {
        store.dispatch({ type: ActionType.SET_PAUSED, data: false })
    }

export {
    play,
}
