// tslint:disable no-type-definitions-outside-types-modules

import { BEGINNING, Coordinate, Maybe, Ms, typedMap, TypedMap } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread, ThreadSpec } from '../types'

enum StateKeys {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    THREADS = 'THREADS',
    THREAD_SPECS = 'THREAD_SPECS',
    TIME_POSITION = 'TIME_POSITION',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    WEB_VR = 'WEB_VR',
    HOME_POSITION = 'HOME_POSITION',
    SAMPLE_DATA = 'SAMPLE_DATA',
    IMMERSIVE_AUDIO = 'IMMERSIVE_AUDIO',
}

interface State {
    [ StateKeys.CLOCK ]: Maybe<Worker>,
    [ StateKeys.PAUSED ]: boolean,
    [ StateKeys.THREADS ]: Thread[],
    [ StateKeys.THREAD_SPECS ]: ThreadSpec[],
    [ StateKeys.TIME_POSITION ]: Ms,
    [ StateKeys.IMMERSIVE_AUDIO_READY ]: boolean,
    [ StateKeys.WEB_VR ]: Maybe<Vrb>,
    [ StateKeys.HOME_POSITION ]: Maybe<Coordinate>,
    [ StateKeys.SAMPLE_DATA ]: Maybe<SampleDatas>,
    [ StateKeys.IMMERSIVE_AUDIO ]: boolean,
}

type ImmutableState = TypedMap<State>

const initialState: ImmutableState = typedMap<State>({
    [ StateKeys.CLOCK ]: undefined,
    [ StateKeys.PAUSED ]: true,
    [ StateKeys.THREADS ]: [],
    [ StateKeys.THREAD_SPECS ]: [],
    [ StateKeys.TIME_POSITION ]: BEGINNING,
    [ StateKeys.IMMERSIVE_AUDIO_READY ]: false,
    [ StateKeys.WEB_VR ]: undefined,
    [ StateKeys.HOME_POSITION ]: undefined,
    [ StateKeys.SAMPLE_DATA ]: undefined,
    [ StateKeys.IMMERSIVE_AUDIO ]: false,
})

export {
    ImmutableState,
    StateKeys,
    State,
    initialState,
}
