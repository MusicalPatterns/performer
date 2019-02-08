import { apply, Coordinate, CoordinateElement, from, map, Ordinal, to } from '@musical-patterns/utilities'
import { Note } from '../types'

const applyHomePosition: (note: Note, homePosition: Coordinate) => Note =
    (note: Note, homePosition: Coordinate): Note =>
        ({
            ...note,
            position: map(note.position, (coordinateElement: CoordinateElement, index: Ordinal) =>
                apply.Translation(
                    coordinateElement,
                    to.Translation(from.CoordinateElement(apply.Ordinal(homePosition, index))),
                ),
            ),
        })

export {
    applyHomePosition,
}
