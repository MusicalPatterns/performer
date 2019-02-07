import { apply, difference, from, INITIAL, NEXT, Ordinal, Time, to } from '@musical-patterns/utilities'
import { Note } from '../types'
import { InitialNote } from './types'

const calculateInitialNote: (notes: Note[], startTime: Time) => InitialNote =
    (notes: Note[], startTime: Time): InitialNote => {
        let noteIndex: Ordinal = INITIAL
        let nextStart: Time = to.Time(0)
        while (nextStart < startTime) {
            const duration: Time = apply.Ordinal(notes, noteIndex).duration
            nextStart = apply.Translation(nextStart, to.Translation(from.Time(duration)))
            noteIndex = apply.Translation(noteIndex, NEXT)

            if (from.Ordinal(noteIndex) > difference(notes.length, 1)) {
                noteIndex = INITIAL
            }
        }

        return { noteIndex, nextStart }
    }

export {
    calculateInitialNote,
}
