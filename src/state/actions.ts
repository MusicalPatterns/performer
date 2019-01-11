// tslint:disable:no-type-definitions-outside-types-modules

import { Coordinate, Time } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../construction'
import { Thread, ThreadSpec } from '../types'

enum ActionType {
    SET_CLOCK = 'SET_CLOCK',
    SET_THREADS = 'SET_THREADS',
    SET_THREAD_SPECS = 'SET_THREAD_SPECS',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
    SET_TIME = 'SET_TIME',
    SET_IMMERSIVE_AUDIO_READY = 'SET_IMMERSIVE_AUDIO_READY',
    SET_PAUSED = 'SET_PAUSED',
    SET_WEB_VR = 'SET_WEB_VR',
    SET_HOME_POSITION = 'SET_HOME_POSITION',
    SET_SAMPLE_DATA = 'SET_SAMPLE_DATA',
    TOGGLE_IMMMERSIVE_AUDIO = 'TOGGLE_IMMMERSIVE_AUDIO',
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

interface TogglePaused {
    type: ActionType.TOGGLE_PAUSED,
}

interface SetTime {
    data: Time,
    type: ActionType.SET_TIME,
}

interface SetImmersiveAudioReady {
    type: ActionType.SET_IMMERSIVE_AUDIO_READY,
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
    SetClock |
    SetThreads |
    SetThreadSpecs |
    TogglePaused |
    SetTime |
    SetImmersiveAudioReady |
    SetPaused |
    SetWebVr |
    SetHomePosition |
    SetSampleData |
    ToggleImmersiveAudio

export {
    Action,
    ActionType,
}
