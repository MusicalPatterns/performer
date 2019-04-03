import { Coordinate, Ms } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { Voice } from '../types'

interface ComputeToggleImmersiveAudioParameters {
    vrb: Vrb,
}

interface EnableImmersiveAudioParameters {
    homePosition?: Coordinate,
    onNoVr?: VoidFunction,
    onReady?: VoidFunction,
    vrb?: Vrb,
}

interface SetupPerformerParameters {
    onUpdate?: OnUpdate,
    segnoTime?: Ms,
    totalDuration?: Ms,
    voices?: Voice[],
}

interface ToggleImmersiveAudioHandlers {
    enterImmersiveAudio: VoidFunction,
    exitImmersiveAudio: VoidFunction,
}

export {
    ComputeToggleImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
    ToggleImmersiveAudioHandlers,
}
