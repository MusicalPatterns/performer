import { context } from '../performance'
import { ModulePath, SampleName } from './types'

// tslint:disable:no-any
const samples: { [x in SampleName]: AudioBuffer } = {} as any

declare const require: (modulePath: ModulePath) => string

const getOrLoad: (sampleName: SampleName) => Promise<AudioBuffer>  =
    async (sampleName: SampleName): Promise<AudioBuffer> => {
        if (!samples[ sampleName ]) {
            await load(sampleName)
        }

        return samples[ sampleName ]
    }

const getSampleUrl: (sampleName: SampleName) => ModulePath =
    (sampleName: SampleName): ModulePath => {
        let inTest: boolean = false
        Object.keys(require)
            .forEach((key: string): void => {
                if (key === 'extensions') {
                    inTest = true
                }
            })

        return inTest ? '' : require(`../../samples/${sampleName}.wav`)
    }

const load: (sampleName: SampleName) => Promise<void> =
    async (sampleName: SampleName): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            const request: XMLHttpRequest = new XMLHttpRequest()
            const url: ModulePath = getSampleUrl(sampleName)
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
