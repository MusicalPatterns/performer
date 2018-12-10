import { apply, Coordinate, from, Maybe, to } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio, Scene } from 'three'
import { Vrb } from 'vrb'
import { GAIN_ADJUST_FOR_WEB_AUDIO } from '../constants'
import { context } from '../performance'
import { ImmutableState, StateKeys, store } from '../state'
import { getOrLoad } from './samples'
import { setPosition } from './setPosition'
import { NoteToPlay, SampleVoiceConstructorParameters, StartNote, StopNote, Voice } from './types'

const constructSampleVoice: (sampleVoiceConstructorParameters: SampleVoiceConstructorParameters) => Promise<Voice> =
    async ({ timbre }: SampleVoiceConstructorParameters): Promise<Voice> => {
        const state: ImmutableState = store.getState() as ImmutableState
        const webVr: Maybe<Vrb> = state.get(StateKeys.WEB_VR)
        const scene: Maybe<Scene> = state.get(StateKeys.SCENE)
        const homePosition: Maybe<Coordinate> = state.get(StateKeys.HOME_POSITION)

        let sourceNode: AudioBufferSourceNode
        let gainNode: GainNode

        let positionNode: Object3D
        let positionalSound: PositionalAudio
        if (webVr && scene) {
            positionNode = new Object3D()
            scene.add(positionNode)
        }

        const buffer: AudioBuffer = await getOrLoad(timbre)

        const startNote: StartNote = ({ frequency, gain, position, playbackRate }: NoteToPlay): void => {
            if (webVr) {
                // tslint:disable-next-line:no-unsafe-any
                sourceNode = webVr.listener.context.createBufferSource()
                sourceNode.buffer = buffer

                gainNode = positionalSound.getOutput()

                // tslint:disable-next-line:no-unsafe-any
                positionalSound = webVr.createPositionalSound()
                positionNode.add(positionalSound)

                setPosition(positionNode, position, homePosition)
                positionalSound.setNodeSource(sourceNode)

                positionalSound.setVolume(from.Scalar(apply.Scalar(gain, GAIN_ADJUST_FOR_WEB_AUDIO)))
            }
            else {
                sourceNode = context.createBufferSource()
                sourceNode.buffer = buffer

                gainNode = context.createGain()
                gainNode.connect(context.destination)

                gainNode.gain.value = from.Scalar(gain)
            }

            sourceNode.playbackRate.value = from.Scalar(playbackRate || to.Scalar(1))

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
