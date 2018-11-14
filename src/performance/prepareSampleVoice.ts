import { Object3D, PositionalAudio, Scene } from 'three'
import { Vrb } from 'vrb'
import { BASE_GAIN, BASE_SAMPLE_GAIN, STANDARDIZED_SAMPLE_PITCH_OF_C5, X_AXIS, Y_AXIS, Z_AXIS } from '../constants'
import {
    NoteToPlay,
    PrepareSampleVoiceParameters,
    SpatializationType,
    StartNote,
    StopNote,
    Voice,
} from '../index'
import { from, Scalar, to } from '../nominal'
import { ImmutableState, StateKeys, store } from '../state'
import { applyScale, centsToPitch, dereference, Maybe } from '../utilities'
import { context } from './context'
import { buildSampleData, SampleDatas } from './sampleData'
import { samples } from './samples'

let sampleData: SampleDatas

const prepareSampleVoice: (prepareSampleVoiceParameters: PrepareSampleVoiceParameters) => Voice =
    ({ spatialization, timbre }: PrepareSampleVoiceParameters): Voice => {
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

                gainNode.gain.value = from.Scalar(applyScale(gain, BASE_SAMPLE_GAIN))
            }

            sourceNode.connect(gainNode)

            const pitch: Scalar =
                to.Scalar(from.Frequency(frequency) / from.Frequency(STANDARDIZED_SAMPLE_PITCH_OF_C5))
            const samplePitchAdjustment: Scalar =
                centsToPitch(sampleData[ timbre ].centsAdjustment || to.Cents(0))
            sourceNode.playbackRate.value = from.Scalar(pitch) * from.Scalar(samplePitchAdjustment)

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
    prepareSampleVoice,
}
