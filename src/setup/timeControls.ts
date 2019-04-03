import { BEGINNING, Ms } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { computePatternTime } from './patternTime'
import { OnUpdate, SetupTimeControlsParameters } from './types'

const setupTimeControls: (parameters: {
    onUpdate: OnUpdate,
    segnoTime: Ms,
    totalDuration: Ms,
}) => void =
    ({ onUpdate, segnoTime, totalDuration }: SetupTimeControlsParameters): void => {
        let previousTimePosition: Ms = BEGINNING
        store.subscribe((): void => {
            const timePosition: Ms = store.getState()
                .get(StateKey.TIME_POSITION)

            if (timePosition !== previousTimePosition) {
                onUpdate(computePatternTime({ timePosition, totalDuration, segnoTime }))
                previousTimePosition = timePosition
            }
        })
    }

export {
    setupTimeControls,
}
