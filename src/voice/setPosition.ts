import { apply, Coordinate, from, Maybe, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D } from 'three'

const setPosition: (positionNode: Object3D, position: Coordinate, homePosition: Maybe<Coordinate>) => void =
    (positionNode: Object3D, position: Coordinate, homePosition: Maybe<Coordinate>): void => {
        let calculatedPosition: number[] = [
            position.length ? from.CoordinateElement(apply.Index(position, X_AXIS)) : 0,
            position.length > 0 ? from.CoordinateElement(apply.Index(position, Y_AXIS)) : 0,
            position.length > 1 ? from.CoordinateElement(apply.Index(position, Z_AXIS)) : 0,
        ]
        if (homePosition) {
            calculatedPosition = calculatedPosition.map((coordinateElement: number, index: number) =>
                coordinateElement + from.CoordinateElement(homePosition[ index ]))
        }
        positionNode.position.set(
            apply.Index(calculatedPosition, X_AXIS),
            apply.Index(calculatedPosition, Y_AXIS),
            apply.Index(calculatedPosition, Z_AXIS),
        )
    }

export {
    setPosition,
}
