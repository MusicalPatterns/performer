import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'

interface EnableImmersiveAudioParameters {
    vrb?: Vrb,
}

interface SetupPerformerParameters {
    onUpdate: OnUpdate,
}

export {
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
}
