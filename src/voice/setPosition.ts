import { apply, Coordinate, from, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D } from 'three'

const setPosition: (positionNode: Object3D, position: Coordinate) => void =
    (positionNode: Object3D, position: Coordinate): void => {
        let rawPosition: number[] = from.Coordinate(position)
        positionNode.position.set(
            apply.Index(rawPosition, X_AXIS),
            apply.Index(rawPosition, Y_AXIS),
            apply.Index(rawPosition, Z_AXIS),
        )
    }

export {
    setPosition,
}
