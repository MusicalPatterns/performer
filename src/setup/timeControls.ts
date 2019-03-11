import { BEGINNING, Ms } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { OnUpdate } from './types'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTimePosition: Ms = BEGINNING
        store.subscribe((): void => {
            const timePosition: Ms = store.getState()
                .get(StateKey.TIME_POSITION)

            if (timePosition !== previousTimePosition) {
                onUpdate(timePosition)
                previousTimePosition = timePosition
            }
        })
    }

export {
    setupTimeControls,
}
