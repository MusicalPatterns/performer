// tslint:disable:no-type-definitions-outside-types-modules

import { Coordinate, Time } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread } from '../types'

enum ActionType {
    SET_THREADS = 'SET_THREADS',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
    SET_TIME = 'SET_TIME',
    SET_PAUSED = 'SET_PAUSED',
    INCREMENT_TIME = 'INCREMENT_TIME',
    SET_WEB_VR = 'SET_WEB_VR',
    SET_HOME_POSITION = 'SET_HOME_POSITION',
    SET_SAMPLE_DATA = 'SET_SAMPLE_DATA',
    TOGGLE_IMMMERSIVE_AUDIO = 'TOGGLE_IMMMERSIVE_AUDIO',
}

interface SetThreads {
    data: Thread[],
    type: ActionType.SET_THREADS,
}

interface TogglePaused {
    type: ActionType.TOGGLE_PAUSED,
}

interface SetTime {
    data: Time,
    type: ActionType.SET_TIME,
}

interface SetPaused {
    data: boolean,
    type: ActionType.SET_PAUSED,
}

interface IncrementTime {
    data: Time,
    type: ActionType.INCREMENT_TIME,
}

interface SetWebVr {
    data: Vrb,
    type: ActionType.SET_WEB_VR,
}

interface SetHomePosition {
    data: Coordinate,
    type: ActionType.SET_HOME_POSITION,
}

interface SetSampleData {
    data: SampleDatas,
    type: ActionType.SET_SAMPLE_DATA,
}

interface ToggleImmersiveAudio {
    type: ActionType.TOGGLE_IMMMERSIVE_AUDIO,
}

type Action =
    SetThreads |
    TogglePaused |
    SetTime |
    SetPaused |
    IncrementTime |
    SetWebVr |
    SetHomePosition |
    SetSampleData |
    ToggleImmersiveAudio

export {
    Action,
    ActionType,
}
