import { apply, from } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio, Scene } from 'three'
import { Vrb } from 'vrb'
import { BASE_GAIN, X_AXIS, Y_AXIS, Z_AXIS } from '../constants'
import { SpatializationType } from '../index'
import { ImmutableState, StateKeys, store } from '../state'
import { Maybe } from '../utilities'
import { context } from './context'
import { NoteToPlay, OscillatorVoiceConstructorParameters, StartNote, StopNote, Voice } from './types'

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
                oscillatorNode.type = timbre
                oscillatorNode.start()
                oscillatorNode.frequency.value = from.Frequency(frequency)
                // @ts-ignore
                positionalSound.setNodeSource(oscillatorNode)
                positionalSound.setVolume(from.Scalar(apply.Scalar(gain, BASE_GAIN)))
            }
            else {
                oscillatorNode = context.createOscillator()
                gainNode = context.createGain()
                gainNode.connect(context.destination)
                oscillatorNode.connect(gainNode)
                oscillatorNode.type = timbre
                oscillatorNode.start()
                oscillatorNode.frequency.value = from.Frequency(frequency)
                gainNode.gain.value = from.Scalar(apply.Scalar(gain, BASE_GAIN))
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
