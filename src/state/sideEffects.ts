import { Maybe, Time, to } from '@musical-patterns/utilities'
import { update } from '../performance'
import { Thread } from '../types'

const stopThreads: (threads: Thread[]) => void =
    (threads: Thread[]): void => {
        threads.forEach((thread: Thread): void => {
            thread.voice.stopNote()
            thread.noteIndex = to.Index(0)
            thread.nextStart = to.Time(0)
            thread.nextEnd = to.Time(0)
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
