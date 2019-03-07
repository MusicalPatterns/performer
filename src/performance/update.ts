import { apply, from, INITIAL, isUndefined, Maybe, Ms, NEXT, to } from '@musical-patterns/utilities'
import { Note, Thread } from '../types'

const startThreadNote: (thread: Thread, note: Note) => void =
    (thread: Thread, note: Note): void => {
        thread.voice.startNote({
            ...note,
            position: note.position || [ 0, 0, 0 ].map(to.Meters),
        })

        thread.nextEnd = apply.Translation(
            thread.nextStart,
            to.Translation(note.sustain),
        )
        thread.nextStart = apply.Translation(
            thread.nextStart,
            to.Translation(note.duration),
        )

        thread.noteIndex = apply.Translation(thread.noteIndex, NEXT)
        if (from.Ordinal(thread.noteIndex) === thread.notes.length) {
            thread.noteIndex = INITIAL
        }
    }

const update: (thread: Thread, timePosition: Ms) => void =
    (thread: Thread, timePosition: Ms): void => {
        if (thread.notes.length === 0) {
            return
        }

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
