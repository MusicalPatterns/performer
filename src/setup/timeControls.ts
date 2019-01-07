import { BEGINNING, Time } from '@musical-patterns/utilities'
import { OnUpdate } from '../index'
import { ImmutableState, StateKeys, store } from '../state'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTime: Time = BEGINNING
        store.subscribe((): void => {
            const state: ImmutableState = store.getState() as ImmutableState
            const time: Time = state.get(StateKeys.TIME)

            if (time !== previousTime) {
                onUpdate(time)
                previousTime = time
            }
        })
    }

export {
    setupTimeControls,
}
