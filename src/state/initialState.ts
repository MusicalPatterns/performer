import { to } from '@musical-patterns/utilities'
import { immutablize } from './immutablize'
import { ImmutableState } from './state'

const initialState: ImmutableState = immutablize({
    clock: undefined,
    paused: true,
    scene: undefined,
    threads: [],
    time: to.Time(0),
    webVr: undefined,
})

export {
    initialState,
}
