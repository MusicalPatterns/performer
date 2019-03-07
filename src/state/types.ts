// tslint:disable no-type-definitions-outside-types-modules

import { ActionForState, Coordinate, Maybe, Meters, Ms, ThreeDimensional, TypedMap } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread, ThreadSpec } from '../types'

enum StateKey {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    THREADS = 'THREADS',
    THREAD_SPECS = 'THREAD_SPECS',
    TIME_POSITION = 'TIME_POSITION',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    WEB_VR = 'WEB_VR',
    HOME_POSITION = 'HOME_POSITION',
    SAMPLE_DATA = 'SAMPLE_DATA',
    IMMERSIVE_AUDIO_ENABLED = 'IMMERSIVE_AUDIO_ENABLED',
}

interface State {
    [ StateKey.CLOCK ]: Maybe<Worker>,
    [ StateKey.PAUSED ]: boolean,
    [ StateKey.THREADS ]: Thread[],
    [ StateKey.THREAD_SPECS ]: ThreadSpec[],
    [ StateKey.TIME_POSITION ]: Ms,
    [ StateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ StateKey.WEB_VR ]: Maybe<Vrb>,
    [ StateKey.HOME_POSITION ]: Maybe<Coordinate<Meters, ThreeDimensional>>,
    [ StateKey.SAMPLE_DATA ]: Maybe<SampleDatas>,
    [ StateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
}

type ImmutableState = TypedMap<State>

type Action = ActionForState<State>

export {
    ImmutableState,
    StateKey,
    State,
    Action,
}
