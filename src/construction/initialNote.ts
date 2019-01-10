import { apply, from, Index, Time, to } from '@musical-patterns/utilities'
import { Note } from '../types'
import { InitialNote } from './types'

const calculateInitialNote: (notes: Note[], startTime: Time) => InitialNote =
    (notes: Note[], startTime: Time): InitialNote => {
        let noteIndex: Index = to.Index(0)
        let nextStart: Time = to.Time(0)
        while (nextStart < startTime) {
            const duration: Time = apply.Index(notes, noteIndex).duration
            nextStart = apply.Offset(nextStart, to.Offset(from.Time(duration)))
            noteIndex = apply.Offset(noteIndex, to.Offset(1))

            if (from.Index(noteIndex) > notes.length - 1) {
                noteIndex = to.Index(0)
            }
        }

        return { noteIndex, nextStart }
    }

export {
    calculateInitialNote,
}
