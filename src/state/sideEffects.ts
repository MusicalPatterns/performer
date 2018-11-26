import { Maybe, Time } from '@musical-patterns/shared'
import { update } from '../performance'
import { Thread } from '../types'

const stopThreads: (threads: Thread[]) => void =
    (threads: Thread[]): void => {
        threads.forEach((thread: Thread): void => {
            thread.voice.stopNote()
        })
    }

const updateThreads: (threads: Thread[], time: Time) => void =
    (threads: Thread[], time: Time): void => {
        threads.forEach((thread: Thread): void => {
            update(thread, time)
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
