import { apply, Coordinate, from, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { BuildPositionalAudioParameters } from './types'

const setPosition: (positionNode: Object3D, position: Coordinate) => void =
    (positionNode: Object3D, position: Coordinate): void => {
        const rawPosition: number[] = from.Coordinate(position)
        positionNode.position.set(
            apply.Ordinal(rawPosition, X_AXIS),
            apply.Ordinal(rawPosition, Y_AXIS),
            apply.Ordinal(rawPosition, Z_AXIS),
        )
    }

const buildPositionalAudio: (parameters: BuildPositionalAudioParameters) => PositionalAudio =
    ({ sourceNode, positionNode, webVr, position }: BuildPositionalAudioParameters): PositionalAudio => {
        const positionalAudio: PositionalAudio = webVr.createPositionalSound()
        // @ts-ignore
        positionalAudio.setNodeSource(sourceNode)
        positionNode.add(positionalAudio)
        setPosition(positionNode, position)

        return positionalAudio
    }

export {
    buildPositionalAudio,
}
