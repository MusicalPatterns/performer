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

        thread.nextEnd = apply.Translation(
            thread.nextStart,
            to.Translation(from.Time(note.sustain)),
        )
        thread.nextStart = apply.Translation(
            thread.nextStart,
            to.Translation(from.Time(note.duration)),
        )

        thread.noteIndex = to.Ordinal(from.Ordinal(thread.noteIndex) + 1)
        if (from.Ordinal(thread.noteIndex) === thread.notes.length) {
            thread.noteIndex = to.Ordinal(0)
        }
    }

const update: (thread: Thread, time: Time) => void =
    (thread: Thread, time: Time): void => {
        const note: Note = apply.Ordinal(thread.notes, thread.noteIndex)

        if (time > thread.nextEnd) {
            thread.voice.stopNote()
        }

        if (time > thread.nextStart) {
            startThreadNote(thread, note)
        }
    }

export {
    update,
}
