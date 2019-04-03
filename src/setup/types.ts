import { Ms } from '@musical-patterns/utilities'

type OnUpdate = (timePosition: Ms) => void

interface SetupTimeControlsParameters {
    onUpdate: OnUpdate,
    segnoTime: Ms,
    totalDuration: Ms,
}

interface ComputePatternTimeParameters {
    segnoTime: Ms,
    timePosition: Ms,
    totalDuration: Ms,
}

export {
    OnUpdate,
    ComputePatternTimeParameters,
    SetupTimeControlsParameters,
}
