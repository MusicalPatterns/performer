import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { ThreadSpec } from '../types'

interface EnableImmersiveAudioParameters {
    vrb?: Vrb,
}

interface AutoStart {
    threadSpecs: ThreadSpec[],
    vrb?: Vrb,
}

interface SetupPerformerParameters {
    autoStart?: AutoStart,
    onUpdate?: OnUpdate,
}

export {
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
}
