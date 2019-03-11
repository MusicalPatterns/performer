import { Maybe } from '@musical-patterns/utilities'
import { StateKey, store } from '../../state'
import { Sound } from '../../types'
import { calculatePlaybackRate } from './calculatePlaybackRate'
import { SampleDatas, SampleName } from './types'

const applyPlaybackRate: (sound: Sound, timbreName: SampleName) => Sound =
    (sound: Sound, timbreName: SampleName): Sound => {
        const outputSound: Sound = sound

        const sampleData: Maybe<SampleDatas> = store.getState()
            .get(StateKey.SAMPLE_DATA)

        if (sampleData) {
            sound.playbackRate = calculatePlaybackRate(sampleData[ timbreName ], sound.frequency)
        }

        return outputSound
    }

export {
    applyPlaybackRate,
}
