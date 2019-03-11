import { Object3D } from 'three'
import { computeGainNode } from './gainNode'
import { computePositionalAudio } from './positionalAudio'
import { computeSourceNode, SourceNode } from './source'
import { ComputeStartSoundParameters, SoundToPlay, StartedSound, StartSound, StartSoundAndStartedSound } from './types'

const computeStartSound: (parameters: ComputeStartSoundParameters) => StartSoundAndStartedSound =
    (parameters: ComputeStartSoundParameters): StartSoundAndStartedSound => {
        const { timbre, webVr, sourceType, immersiveAudioEnabled } = parameters

        const startedSound: StartedSound = {}

        const startSound: StartSound = ({ gain, frequency, playbackRate, position }: SoundToPlay): void => {
            const sourceNode: SourceNode = computeSourceNode({
                frequency,
                immersiveAudioEnabled,
                playbackRate,
                sourceType,
                timbre,
                webVr,
            })
            startedSound.sourceNode = sourceNode
            if (immersiveAudioEnabled && webVr) {
                const positionNode: Object3D = new Object3D()
                startedSound.positionNode = positionNode
                startedSound.positionalAudio = computePositionalAudio({ position, positionNode, sourceNode, webVr })
            }
            startedSound.gainNode = computeGainNode({ gain, sourceNode, positionalAudio: startedSound.positionalAudio })
            startedSound.sourceNode.start()
        }

        return {
            startSound,
            startedSound,
        }
    }

export {
    computeStartSound,
}
