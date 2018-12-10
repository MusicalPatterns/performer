import { context } from '../performance'
import { ModulePath, SampleName } from './types'

// tslint:disable:no-any
const samples: { [x in SampleName]: AudioBuffer } = {} as any

declare const require: (modulePath: ModulePath) => string

const getOrLoad: (timbre: SampleName) => Promise<AudioBuffer>  =
    async (timbre: SampleName): Promise<AudioBuffer> => {
        if (!samples[ timbre ]) {
            await load(timbre)
        }

        return samples[ timbre ]
    }

const getTimbreUrl: (timbre: SampleName) => ModulePath =
    (timbre: SampleName): ModulePath => {
        let inTest: boolean = false
        Object.keys(require)
            .forEach((key: string): void => {
                if (key === 'extensions') {
                    inTest = true
                }
            })

        return inTest ? '' : require(`../../samples/${timbre}.wav`)
    }

const load: (timbre: SampleName) => Promise<void> =
    async (timbre: SampleName): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            const request: XMLHttpRequest = new XMLHttpRequest()
            const url: ModulePath = getTimbreUrl(timbre)
            request.open('GET', url, true)
            request.responseType = 'arraybuffer'

            request.onload = async (): Promise<void> => {
                const audioData: ArrayBuffer = request.response as ArrayBuffer
                await context.decodeAudioData(audioData, (buffer: AudioBuffer): void => {
                    samples[ timbre ] = buffer
                    resolve()
                })
            }
            request.send()
        })

export {
    getOrLoad,
}
