import { to } from '../nominal'
import { immutablize } from './immutablize'
import { ImmutableState } from './state'

const initialState: ImmutableState = immutablize({
    atomicTime: to.Time(0),
    clock: undefined,
    paused: true,
    rawTime: to.Time(0),
    scene: undefined,
    threads: [],
    webVr: undefined,
})

export {
    initialState,
}
