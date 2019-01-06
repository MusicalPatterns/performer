import { Coordinate } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { ThreadSpec } from '../types'

interface BuildEnterImmersiveAudioParameters {
    vrb: Vrb,
}

interface EnableImmersiveAudioParameters {
    homePosition?: Coordinate,
    vrb?: Vrb,
}

interface SetupPerformerParameters {
    onUpdate?: OnUpdate,
    threadSpecs?: ThreadSpec[],
}

export {
    BuildEnterImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
}
