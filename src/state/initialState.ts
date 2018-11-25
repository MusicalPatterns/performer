import { to } from '@musical-patterns/utilities'
import { AllowedValue, immutablize } from './immutablize'
import { ImmutableState, State, StateKeys } from './state'

const initialState: ImmutableState = immutablize<AllowedValue, State>({
    [ StateKeys.CLOCK ]: undefined,
    [ StateKeys.PAUSED ]: true,
    [ StateKeys.SCENE ]: undefined,
    [ StateKeys.THREADS ]: [],
    [ StateKeys.TIME ]: to.Time(0),
    [ StateKeys.WEB_VR ]: undefined,
})

export {
    initialState,
}
