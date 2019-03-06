import { Cents } from '@musical-patterns/utilities'

enum SampleName {
    CELLO = 'CELLO',
    DOUBLE_BASS = 'DOUBLE_BASS',
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

interface SampleData {
    centsAdjustment?: Cents,
    unpitched?: boolean,
}

type SampleDatas = { [K in SampleName]: SampleData }

type Samples = { [x in SampleName]: AudioBuffer }

export {
    SampleName,
    SampleDatas,
    SampleData,
    Samples,
}
