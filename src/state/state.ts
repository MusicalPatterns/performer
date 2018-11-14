import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../index'
import { Time } from '../nominal'
import { Maybe } from '../utilities'
import { StateIndexSignature, TypedMap } from './immutablize'

enum StateKeys {
    THREADS = 'threads',
    CLOCK = 'clock',
    PAUSED = 'paused',
    ATOMIC_TIME = 'atomicTime',
    RAW_TIME = 'rawTime',
    SCENE = 'scene',
    WEB_VR = 'webVr',
}

interface State extends StateIndexSignature {
    [ StateKeys.THREADS ]: Thread[],
    [ StateKeys.CLOCK ]: Maybe<Worker>,
    [ StateKeys.PAUSED ]: boolean,
    [ StateKeys.ATOMIC_TIME ]: Time,
    [ StateKeys.RAW_TIME ]: Time,
    [ StateKeys.SCENE]: Maybe<Scene>,
    [ StateKeys.WEB_VR]: Maybe<Vrb>,
}

type ImmutableState = TypedMap<State>

export {
    ImmutableState,
    StateKeys,
    State,
}
