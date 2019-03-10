import { Coordinate } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { Voice } from '../types'

interface BuildToggleImmersiveAudioParameters {
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
    voices?: Voice[],
}

interface ToggleImmersiveAudioHandlers {
    enterImmersiveAudio: VoidFunction,
    exitImmersiveAudio: VoidFunction,
}

export {
    BuildToggleImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
    ToggleImmersiveAudioHandlers,
}
