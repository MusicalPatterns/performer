// tslint:disable:no-type-definitions-outside-types-modules

import { BEGINNING, Coordinate, Maybe, Time, typedMap, TypedMap } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread } from '../types'

enum StateKeys {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    THREADS = 'THREADS',
    TIME = 'TIME',
    WEB_VR = 'WEB_VR',
    HOME_POSITION = 'HOME_POSITION',
    SAMPLE_DATA = 'SAMPLE_DATA',
    IMMERSIVE_AUDIO = 'IMMERSIVE_AUDIO',
}

interface State {
    [ StateKeys.CLOCK ]: Maybe<Worker>,
    [ StateKeys.PAUSED ]: boolean,
    [ StateKeys.THREADS ]: Thread[],
    [ StateKeys.TIME ]: Time,
    [ StateKeys.WEB_VR ]: Maybe<Vrb>,
    [ StateKeys.HOME_POSITION ]: Maybe<Coordinate>,
    [ StateKeys.SAMPLE_DATA ]: Maybe<SampleDatas>,
    [ StateKeys.IMMERSIVE_AUDIO ]: boolean,
}

type StateValueTypes =
    boolean |
    Time |
    Thread[] |
    Maybe<Worker> |
    Maybe<Vrb> |
    Maybe<Coordinate> |
    Maybe<SampleDatas>

type ImmutableState = TypedMap<StateValueTypes, State>

const initialState: ImmutableState = typedMap<StateValueTypes, State>({
    [ StateKeys.CLOCK ]: undefined,
    [ StateKeys.PAUSED ]: true,
    [ StateKeys.THREADS ]: [],
    [ StateKeys.TIME ]: BEGINNING,
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
