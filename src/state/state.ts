// tslint:disable:no-type-definitions-outside-types-modules

import { Maybe, Time, to, typedMap, TypedMap } from '@musical-patterns/utilities'
import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../types'

enum StateKeys {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    SCENE = 'SCENE',
    THREADS = 'THREADS',
    TIME = 'TIME',
    WEB_VR = 'WEB_VR',
}

interface State {
    [ StateKeys.CLOCK ]: Maybe<Worker>,
    [ StateKeys.PAUSED ]: boolean,
    [ StateKeys.SCENE ]: Maybe<Scene>,
    [ StateKeys.THREADS ]: Thread[],
    [ StateKeys.TIME ]: Time,
    [ StateKeys.WEB_VR ]: Maybe<Vrb>,
}

type StateValueTypes =
    boolean |
    Time |
    Thread[] |
    Maybe<Worker> |
    Maybe<Scene> |
    Maybe<Vrb>

type ImmutableState = TypedMap<StateValueTypes, State>

const initialState: ImmutableState = typedMap<StateValueTypes, State>({
    [ StateKeys.CLOCK ]: undefined,
    [ StateKeys.PAUSED ]: true,
    [ StateKeys.SCENE ]: undefined,
    [ StateKeys.THREADS ]: [],
    [ StateKeys.TIME ]: to.Time(0),
    [ StateKeys.WEB_VR ]: undefined,
})

export {
    ImmutableState,
    StateKeys,
    State,
    initialState,
}
