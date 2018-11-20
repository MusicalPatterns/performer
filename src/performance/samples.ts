import { context } from './context'

// @ts-ignore
const samples: { [x in SampleName]: AudioBuffer } = {}

declare const require: (modulePath: ModulePath) => string

type ModulePath = string

enum SampleName {
    CELLO = 'CELLO',
    DOUBLEBASS = 'DOUBLEBASS',
    FLUTE = 'FLUTE',
    PIANO = 'PIANO',
    TROMBONE = 'TROMBONE',
    TRUMPET = 'TRUMPET',
    TUBA = 'TUBA',
    VIOLIN = 'VIOLIN',
    SNARE = 'SNARE',
    KICK = 'KICK',
    HIHAT = 'HIHAT',
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

const load: (timbre: SampleName) => void =
    async (timbre: SampleName): Promise<void> => {
        const request: XMLHttpRequest = new XMLHttpRequest()
        const url: ModulePath = getTimbreUrl(timbre)
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'

        request.onload = async (): Promise<void> => {
            const audioData: ArrayBuffer = request.response as ArrayBuffer
            await context.decodeAudioData(audioData, (buffer: AudioBuffer): void => {
                samples[ timbre ] = buffer
            })
        }
        request.send()
    }

const loadAllSamples: () => void =
    (): void => {
        Object.values(SampleName)
            .forEach(load)
    }

export {
    samples,
    loadAllSamples,
    SampleName,
}
