import { Thread } from '../index'
import { Time } from '../nominal'
import { update } from '../performance'
import { Maybe } from '../utilities'

const stopThreads: (threads: Thread[]) => void =
    (threads: Thread[]): void => {
        threads.forEach((thread: Thread): void => {
            thread.voice.stopNote()
        })
    }

const updateThreads: (threads: Thread[], rawTime: Time, atomicTime: Time) => void =
    (threads: Thread[], rawTime: Time, atomicTime: Time): void => {
        threads.forEach((thread: Thread): void => {
            update(thread, rawTime, atomicTime)
        })
    }

const terminateClock: (clock: Maybe<Worker>) => void =
    (clock: Maybe<Worker>): void => {
        if (clock) {
            clock.terminate()
        }
    }

export {
    stopThreads,
    updateThreads,
    terminateClock,
}
