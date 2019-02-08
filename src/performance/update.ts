import { apply, from, INITIAL, Ms, NEXT, to } from '@musical-patterns/utilities'
import { Note, Thread } from '../types'

const startThreadNote: (thread: Thread, note: Note) => void =
    (thread: Thread, note: Note): void => {
        thread.voice.startNote({
            ...note,
            position: note.position || to.Coordinate([ 0, 0, 0 ]),
        })

        thread.nextEnd = apply.Translation(
            thread.nextStart,
            to.Translation(from.Ms(note.sustain)),
        )
        thread.nextStart = apply.Translation(
            thread.nextStart,
            to.Translation(from.Ms(note.duration)),
        )

        thread.noteIndex = apply.Translation(thread.noteIndex, NEXT)
        if (from.Ordinal(thread.noteIndex) === thread.notes.length) {
            thread.noteIndex = INITIAL
        }
    }

const update: (thread: Thread, timePosition: Ms) => void =
    (thread: Thread, timePosition: Ms): void => {
        const note: Note = apply.Ordinal(thread.notes, thread.noteIndex)

        if (timePosition > thread.nextEnd) {
            thread.voice.stopNote()
        }

        if (timePosition > thread.nextStart) {
            startThreadNote(thread, note)
        }
    }

export {
    update,
}
