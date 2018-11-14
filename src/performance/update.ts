import { Note, Thread, TimeType } from '../index'
import { from, Time, to } from '../nominal'
import { applyOffset, applyScale, dereference } from '../utilities'
import { BASE_DURATION } from './constants'

const startThreadNote: (thread: Thread, note: Note) => void =
    (thread: Thread, note: Note): void => {
        thread.voice.startNote({
            frequency: note.frequency,
            gain: note.gain,
            position: note.position || to.Coordinate([ 0, 0, 0 ]),
        })

        thread.nextEnd = applyOffset(
            thread.nextStart,
            to.Offset(from.Time(applyScale(note.sustain, BASE_DURATION))),
        )
        thread.nextStart = applyOffset(
            thread.nextStart,
            to.Offset(from.Time(applyScale(note.duration, BASE_DURATION))),
        )

        thread.noteIndex = to.Index(from.Index(thread.noteIndex) + 1)
    }

const update: (thread: Thread, rawTime: Time, atomicTime: Time) => void =
    (thread: Thread, rawTime: Time, atomicTime: Time): void => {
        const time: Time = thread.timeType === TimeType.RAW ? rawTime : atomicTime

        const note: Note = dereference(thread.notes, thread.noteIndex)

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
