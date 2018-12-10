import { Coordinate } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { ThreadSpec } from '../types'

interface EnableImmersiveAudioParameters {
    homePosition?: Coordinate,
    vrb?: Vrb,
}

interface AutoStart extends EnableImmersiveAudioParameters {
    threadSpecs: ThreadSpec[],
}

interface SetupPerformerParameters {
    autoStart?: AutoStart,
    onUpdate?: OnUpdate,
}

export {
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
}
