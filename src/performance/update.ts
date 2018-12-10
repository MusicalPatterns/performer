import { apply, from, Time, to } from '@musical-patterns/utilities'
import { Note, Thread } from '../types'

const startThreadNote: (thread: Thread, note: Note) => void =
    (thread: Thread, note: Note): void => {
        thread.voice.startNote({
            frequency: note.frequency,
            gain: note.gain,
            playbackRate: note.playbackRate,
            position: note.position || to.Coordinate([ 0, 0, 0 ]),
        })

        thread.nextEnd = apply.Offset(
            thread.nextStart,
            to.Offset(from.Time(note.sustain)),
        )
        thread.nextStart = apply.Offset(
            thread.nextStart,
            to.Offset(from.Time(note.duration)),
        )

        thread.noteIndex = to.Index(from.Index(thread.noteIndex) + 1)
    }

const update: (thread: Thread, time: Time) => void =
    (thread: Thread, time: Time): void => {
        const note: Note = apply.Index(thread.notes, thread.noteIndex)

        if (time > thread.nextEnd) {
            thread.voice.stopNote()
        }

        if (from.Index(thread.noteIndex) === thread.notes.length) {
            thread.noteIndex = to.Index(0)
        }

        if (time > thread.nextStart) {
            startThreadNote(thread, note)
        }
    }

export {
    update,
}
