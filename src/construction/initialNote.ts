import {
    apply,
    from,
    indexOfLastElement,
    INITIAL,
    isUndefined,
    Maybe,
    Ms,
    NEXT,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { Note } from '../types'
import { InitialNote } from './types'

const calculateInitialNote: (notes: Note[], startTime: Ms) => InitialNote =
    (notes: Note[], startTime: Ms): InitialNote => {
        let noteIndex: Ordinal = INITIAL
        let nextStart: Ms = to.Ms(0)
        while (nextStart < startTime) {
            const nextNote: Maybe<Note> = apply.Ordinal(notes, noteIndex)
            if (isUndefined(nextNote)) {
                throw new Error(`could not find a note at index ${noteIndex}`)
            }
            const duration: Ms = nextNote.duration
            nextStart = apply.Translation(nextStart, to.Translation(duration))
            noteIndex = apply.Translation(noteIndex, NEXT)

            if (from.Ordinal(noteIndex) > indexOfLastElement(notes)) {
                noteIndex = INITIAL
            }
        }

        return { noteIndex, nextStart }
    }

export {
    calculateInitialNote,
}
