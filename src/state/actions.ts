// tslint:disable no-type-definitions-outside-types-modules

import { Coordinate, Meters, Ms, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread, ThreadSpec } from '../types'
import { StateKey } from './state'

enum ActionType {
    SET_CLOCK = 'SET_CLOCK',
    SET_THREADS = 'SET_THREADS',
    SET_THREAD_SPECS = 'SET_THREAD_SPECS',
    SET_TIME_POSITION = 'SET_TIME_POSITION',
    SET_IMMERSIVE_AUDIO_READY = 'SET_IMMERSIVE_AUDIO_READY',
    SET_IMMERSIVE_AUDIO_ENABLED = 'SET_IMMERSIVE_AUDIO_ENABLED',
    SET_PAUSED = 'SET_PAUSED',
    SET_WEB_VR = 'SET_WEB_VR',
    SET_HOME_POSITION = 'SET_HOME_POSITION',
    SET_SAMPLE_DATA = 'SET_SAMPLE_DATA',
}

interface SetClock {
    data: Worker,
    type: ActionType.SET_CLOCK,
}

interface SetThreads {
    data: Thread[],
    type: ActionType.SET_THREADS,
}

interface SetThreadSpecs {
    data: ThreadSpec[],
    type: ActionType.SET_THREAD_SPECS,
}

interface SetTimePosition {
    data: Ms,
    type: ActionType.SET_TIME_POSITION,
}

interface SetImmersiveAudioReady {
    data: boolean,
    type: ActionType.SET_IMMERSIVE_AUDIO_READY,
}

interface SetImmersiveAudioEnabled {
    data: boolean,
    type: ActionType.SET_IMMERSIVE_AUDIO_ENABLED,
}

interface SetPaused {
    data: boolean,
    type: ActionType.SET_PAUSED,
}

interface SetWebVr {
    data: Vrb,
    type: ActionType.SET_WEB_VR,
}

interface SetHomePosition {
    data: Coordinate<Meters, ThreeDimensional>,
    type: ActionType.SET_HOME_POSITION,
}

interface SetSampleData {
    data: SampleDatas,
    type: ActionType.SET_SAMPLE_DATA,
}

type Action =
    SetClock |
    SetThreads |
    SetThreadSpecs |
    SetTimePosition |
    SetImmersiveAudioReady |
    SetImmersiveAudioEnabled |
    SetPaused |
    SetWebVr |
    SetHomePosition |
    SetSampleData

type ActionMap = { [key in keyof typeof ActionType]: StateKey }

export {
    Action,
    ActionType,
    ActionMap,
}
