import { apply, from, Maybe, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio, Scene } from 'three'
import { Vrb } from 'vrb'
import { GAIN_ADJUST_FOR_WEB_AUDIO } from '../constants'
import { ImmutableState, StateKeys, store } from '../state'
import { context } from './context'
import { oscillatorNameToTypeMap } from './oscillatorNameToTypeMap'
import {
    NoteToPlay,
    OscillatorVoiceConstructorParameters,
    SpatializationType,
    StartNote,
    StopNote,
    Voice,
} from './types'

// tslint:disable-next-line:no-type-definitions-outside-types-modules
const constructOscillatorVoice: (oscillatorVoiceConstructorParameters: OscillatorVoiceConstructorParameters) => Voice =
    ({ spatialization, timbre }: OscillatorVoiceConstructorParameters): Voice => {
        let oscillatorNode: OscillatorNode
        let gainNode: GainNode

        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)
        const scene: Maybe<Scene> = state.get(StateKeys.SCENE)

        let positionNode: Object3D
        let positionalSound: PositionalAudio
        if (spatialization === SpatializationType.IMMERSIVE && webVr && scene) {
            positionNode = new Object3D()
            scene.add(positionNode)
        }

        const startNote: StartNote = ({ frequency, gain, position }: NoteToPlay): void => {
            if (spatialization === SpatializationType.IMMERSIVE && webVr) {
                // tslint:disable-next-line:no-unsafe-any
                positionalSound = webVr.createPositionalSound()
                positionNode.add(positionalSound)
                gainNode = positionalSound.getOutput()
                oscillatorNode = webVr.createSpatialOscillator()

                positionNode.position.set(
                    from.CoordinateElement(apply.Index(position, X_AXIS)),
                    from.CoordinateElement(apply.Index(position, Y_AXIS)),
                    from.CoordinateElement(apply.Index(position, Z_AXIS)),
                )

                oscillatorNode.connect(gainNode)
                oscillatorNode.type = oscillatorNameToTypeMap[ timbre ] as OscillatorType
                oscillatorNode.start()
                oscillatorNode.frequency.value = from.Frequency(frequency)
                // @ts-ignore
                positionalSound.setNodeSource(oscillatorNode)
                positionalSound.setVolume(from.Scalar(apply.Scalar(gain, GAIN_ADJUST_FOR_WEB_AUDIO)))
            }
            else {
                oscillatorNode = context.createOscillator()
                gainNode = context.createGain()
                gainNode.connect(context.destination)
                oscillatorNode.connect(gainNode)
                oscillatorNode.type = oscillatorNameToTypeMap[ timbre ] as OscillatorType
                oscillatorNode.start()
                oscillatorNode.frequency.value = from.Frequency(frequency)
                gainNode.gain.value = from.Scalar(apply.Scalar(gain, GAIN_ADJUST_FOR_WEB_AUDIO))
            }
        }

        const stopNote: StopNote = (): void => {
            if (positionalSound) {
                positionNode.remove(positionalSound)
            }
            if (oscillatorNode) {
                oscillatorNode.disconnect()
            }
            if (gainNode) {
                gainNode.disconnect()
            }
        }

        return {
            startNote,
            stopNote,
        }
    }

export {
    constructOscillatorVoice,
}
