// tslint:disable
// @ts-ignore
import requestAnimationFrame from 'raf'
import { TIMESTEP } from './constants'

const worker: Worker = self as any

let previousTimestamp: number
let delta: number = 0

const mainLoop: (timestamp: number) => void =
    (timestamp: number): void => {
        if (previousTimestamp) {
            delta += timestamp - previousTimestamp
        }

        while (delta >= TIMESTEP) {
            worker.postMessage(TIMESTEP)
            delta -= TIMESTEP
        }

        previousTimestamp = timestamp
        requestAnimationFrame(mainLoop)
    }

requestAnimationFrame(mainLoop)

const Clock: any = ((): void => undefined) as any

export {
    Clock,
}
