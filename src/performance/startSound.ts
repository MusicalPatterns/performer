import { Object3D } from 'three'
import { buildGainNode } from './gainNode'
import { buildPositionalAudio } from './positionalAudio'
import { buildSourceNode, SourceNode } from './source'
import { BuildStartSoundParameters, SoundToPlay, StartedSound, StartSound, StartSoundAndStartedSound } from './types'

const buildStartSound: (parameters: BuildStartSoundParameters) => StartSoundAndStartedSound =
    (parameters: BuildStartSoundParameters): StartSoundAndStartedSound => {
        const { timbre, webVr, sourceType, immersiveAudioEnabled } = parameters

        const startedSound: StartedSound = {}

        const startSound: StartSound = ({ gain, frequency, playbackRate, position }: SoundToPlay): void => {
            const sourceNode: SourceNode = buildSourceNode({
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
                startedSound.positionalAudio = buildPositionalAudio({ position, positionNode, sourceNode, webVr })
            }
            startedSound.gainNode = buildGainNode({ gain, sourceNode, positionalAudio: startedSound.positionalAudio })
            startedSound.sourceNode.start()
        }

        return {
            startSound,
            startedSound,
        }
    }

export {
    buildStartSound,
}
