// tslint:disable:no-type-definitions-outside-types-modules

import { Maybe, Time } from '@musical-patterns/utilities'
import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../types'
import { AllowedValue, StateIndexSignature, TypedMap } from './immutablize'

enum StateKeys {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    SCENE = 'SCENE',
    THREADS = 'THREADS',
    TIME = 'TIME',
    WEB_VR = 'WEB_VR',
}

interface State extends StateIndexSignature<AllowedValue> {
    [ StateKeys.CLOCK ]: Maybe<Worker>,
    [ StateKeys.PAUSED ]: boolean,
    [ StateKeys.SCENE ]: Maybe<Scene>,
    [ StateKeys.THREADS ]: Thread[],
    [ StateKeys.TIME ]: Time,
    [ StateKeys.WEB_VR ]: Maybe<Vrb>,
}

type ImmutableState = TypedMap<AllowedValue, State>

export {
    ImmutableState,
    StateKeys,
    State,
}
