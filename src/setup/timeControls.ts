import { BEGINNING, Ms } from '@musical-patterns/utilities'
import { OnUpdate } from '../index'
import { ImmutableState, StateKeys, store } from '../state'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTimePosition: Ms = BEGINNING
        store.subscribe((): void => {
            const state: ImmutableState = store.getState() as ImmutableState
            const timePosition: Ms = state.get(StateKeys.TIME_POSITION)

            if (timePosition !== previousTimePosition) {
                onUpdate(timePosition)
                previousTimePosition = timePosition
            }
        })
    }

export {
    setupTimeControls,
}
