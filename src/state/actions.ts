import { Time } from '@musical-patterns/utilities'
import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../types'

enum ActionType {
    SET_THREADS = 'set threads',
    TOGGLE_PAUSED = 'toggle paused',
    SET_CLOCK = 'set clock',
    SET_TIME = 'set time',
    SET_PAUSED = 'set paused',
    INCREMENT_TIME = 'increment time',
    SET_SCENE = 'set scene',
    SET_WEB_VR = 'set web vr',
}

interface SetThreads {
    data: Thread[],
    type: ActionType.SET_THREADS,
}

interface TogglePaused {
    type: ActionType.TOGGLE_PAUSED,
}

interface SetClock {
    data: Worker,
    type: ActionType.SET_CLOCK,
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

interface SetScene {
    data: Scene,
    type: ActionType.SET_SCENE,
}

interface SetWebVr {
    data: Vrb,
    type: ActionType.SET_WEB_VR,
}

type Action =
    SetThreads |
    TogglePaused |
    SetClock |
    SetTime |
    SetPaused |
    IncrementTime |
    SetScene |
    SetWebVr

export {
    Action,
    ActionType,
}
