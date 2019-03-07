import { apply, Coordinate, map, Meters, Ordinal, to } from '@musical-patterns/utilities'
import { Note } from '../types'

const applyHomePosition: (note: Note, homePosition: Coordinate<Meters>) => Note =
    (note: Note, homePosition: Coordinate<Meters>): Note => ({
        ...note,
        position: map(note.position, (meters: Meters, index: Ordinal) =>
            apply.Translation(
                meters,
                to.Translation(apply.Ordinal(homePosition, index)),
            ),
        ),
    })

export {
    applyHomePosition,
}
