import { apply, difference, from, INITIAL, Ms, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { Note } from '../types'
import { InitialNote } from './types'

const calculateInitialNote: (notes: Note[], startTime: Ms) => InitialNote =
    (notes: Note[], startTime: Ms): InitialNote => {
        let noteIndex: Ordinal = INITIAL
        let nextStart: Ms = to.Ms(0)
        while (nextStart < startTime) {
            const duration: Ms = apply.Ordinal(notes, noteIndex).duration
            nextStart = apply.Translation(nextStart, to.Translation(from.Ms(duration)))
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
