import { to } from '@musical-patterns/utilities'
import { immutablize } from './immutablize'
import { ImmutableState, StateKeys } from './state'

const initialState: ImmutableState = immutablize({
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
