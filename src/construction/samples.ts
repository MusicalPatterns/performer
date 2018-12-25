import { context } from '../performance'
import { ModulePath, SampleName } from './types'

// tslint:disable:no-any
const samples: { [x in SampleName]: AudioBuffer } = {} as any

const getOrLoad: (sampleName: SampleName) => Promise<AudioBuffer> =
    async (sampleName: SampleName): Promise<AudioBuffer> => {
        if (!samples[ sampleName ]) {
            await load(sampleName)
        }

        return samples[ sampleName ]
    }

const load: (sampleName: SampleName) => Promise<void> =
    async (sampleName: SampleName): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            const request: XMLHttpRequest = new XMLHttpRequest()
            const url: ModulePath = require(`../../samples/${sampleName}.wav`)
            request.open('GET', url, true)
            request.responseType = 'arraybuffer'

            request.onload = async (): Promise<void> => {
                const audioData: ArrayBuffer = request.response as ArrayBuffer
                await context.decodeAudioData(audioData, (sample: AudioBuffer): void => {
                    samples[ sampleName ] = sample
                    resolve()
                })
            }
            request.send()
        })

export {
    getOrLoad,
}
