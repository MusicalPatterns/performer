import { apply, Coordinate, CoordinateElement, from, to } from '@musical-patterns/utilities'
import { Note } from '../types'

const applyHomePosition: (note: Note, homePosition: Coordinate) => Note =
    (note: Note, homePosition: Coordinate): Note =>
        ({
            ...note,
            position: note.position.map((coordinateElement: CoordinateElement, index: number) =>
                apply.Translation(coordinateElement, to.Translation(from.CoordinateElement(homePosition[ index ])))),
        })

export {
    applyHomePosition,
}
