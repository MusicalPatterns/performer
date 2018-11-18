import { Object3D, PositionalAudio, Scene } from 'three'
import { Vrb } from 'vrb'
import { BASE_GAIN, X_AXIS, Y_AXIS, Z_AXIS } from '../constants'
import {
    NoteToPlay,
    SampleVoiceConstructorParameters,
    SpatializationType,
    StartNote,
    StopNote,
    Voice,
} from '../index'
import { from } from '../nominal'
import { ImmutableState, StateKeys, store } from '../state'
import { applyScale, dereference, Maybe } from '../utilities'
import { calculatePlaybackRate } from './calculatePlaybackRate'
import { context } from './context'
import { buildSampleData, SampleDatas } from './sampleData'
import { samples } from './samples'

let sampleData: SampleDatas

const constructSampleVoice: (sampleVoiceConstructorParameters: SampleVoiceConstructorParameters) => Voice =
    ({ spatialization, timbre }: SampleVoiceConstructorParameters): Voice => {
        sampleData = sampleData || buildSampleData()

        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)
        const scene: Maybe<Scene> = state.get(StateKeys.SCENE)

        let sourceNode: AudioBufferSourceNode
        let gainNode: GainNode

        let positionNode: Object3D
        let positionalSound: PositionalAudio
        if (spatialization === SpatializationType.IMMERSIVE && webVr && scene) {
            positionNode = new Object3D()
            scene.add(positionNode)
        }

        const startNote: StartNote = ({ frequency, gain, position }: NoteToPlay): void => {
            if (spatialization === SpatializationType.IMMERSIVE && webVr) {
                // tslint:disable-next-line:no-unsafe-any
                sourceNode = webVr.listener.context.createBufferSource()
                sourceNode.buffer = samples[ timbre ]

                gainNode = positionalSound.getOutput()

                // tslint:disable-next-line:no-unsafe-any
                positionalSound = webVr.createPositionalSound()
                positionNode.add(positionalSound)
                positionNode.position.set(
                    from.CoordinateElement(dereference(position, X_AXIS)),
                    from.CoordinateElement(dereference(position, Y_AXIS)),
                    from.CoordinateElement(dereference(position, Z_AXIS)),
                )
                positionalSound.setNodeSource(sourceNode)

                positionalSound.setVolume(from.Scalar(applyScale(gain, BASE_GAIN)))
            }
            else {
                sourceNode = context.createBufferSource()
                sourceNode.buffer = samples[ timbre ]

                gainNode = context.createGain()
                gainNode.connect(context.destination)

                gainNode.gain.value = from.Scalar(gain)
            }

            sourceNode.playbackRate.value = calculatePlaybackRate(sampleData[timbre], frequency)

            sourceNode.connect(gainNode)
            sourceNode.start()
        }

        const stopNote: StopNote = (): void => {
            if (sourceNode) {
                try {
                    sourceNode.stop()
                }
                    // tslint:disable-next-line:no-empty
                catch (e) {
                }
            }
        }

        return {
            startNote,
            stopNote,
        }
    }

export {
    constructSampleVoice,
}
