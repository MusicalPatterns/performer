import { apply, from, Ordinal, Time, to } from '@musical-patterns/utilities'
import { Note } from '../types'
import { InitialNote } from './types'

const calculateInitialNote: (notes: Note[], startTime: Time) => InitialNote =
    (notes: Note[], startTime: Time): InitialNote => {
        let noteIndex: Ordinal = to.Ordinal(0)
        let nextStart: Time = to.Time(0)
        while (nextStart < startTime) {
            const duration: Time = apply.Ordinal(notes, noteIndex).duration
            nextStart = apply.Translation(nextStart, to.Translation(from.Time(duration)))
            noteIndex = apply.Translation(noteIndex, to.Translation(1))

            if (from.Ordinal(noteIndex) > notes.length - 1) {
                noteIndex = to.Ordinal(0)
            }
        }

        return { noteIndex, nextStart }
    }

export {
    calculateInitialNote,
}
