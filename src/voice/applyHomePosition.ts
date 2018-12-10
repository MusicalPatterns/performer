import { apply, Coordinate, CoordinateElement, from, to } from '@musical-patterns/utilities'
import { Note } from '../types'

const applyHomePosition: (note: Note, homePosition: Coordinate) => void =
    (note: Note, homePosition: Coordinate): void => {
        note.position = note.position.map((coordinateElement: CoordinateElement, index: number) =>
            apply.Offset(coordinateElement, to.Offset(from.CoordinateElement(homePosition[ index ]))))
    }

export {
    applyHomePosition,
}
