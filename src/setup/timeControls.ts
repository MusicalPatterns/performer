import { BEGINNING, Ms } from '@musical-patterns/utilities'
import { ImmutableState, StateKey, store } from '../state'
import { OnUpdate } from './types'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTimePosition: Ms = BEGINNING
        store.subscribe((): void => {
            const state: ImmutableState = store.getState() as ImmutableState
            const timePosition: Ms = state.get(StateKey.TIME_POSITION)

            if (timePosition !== previousTimePosition) {
                onUpdate(timePosition)
                previousTimePosition = timePosition
            }
        })
    }

export {
    setupTimeControls,
}
