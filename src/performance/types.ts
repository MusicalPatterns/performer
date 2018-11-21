import { Coordinate, Frequency, Scalar } from '@musical-patterns/utilities'
import { Cents } from '../nominal'
import { OscillatorName, SpatializationType } from '../types'

interface SampleVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: SampleName,
}

interface OscillatorVoiceConstructorParameters {
    spatialization?: SpatializationType,
    timbre: OscillatorName,
}

interface NoteToPlay {
    frequency: Frequency,
    gain: Scalar,
    position: Coordinate
}

type StartNote = (note: NoteToPlay) => void

type StopNote = () => void

interface Voice {
    startNote: StartNote,
    stopNote: StopNote,
}

interface SampleData {
    centsAdjustment?: Cents,
    unpitched?: boolean,
}

type SampleDatas = { [x in SampleName]: SampleData }

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

export {
    SampleVoiceConstructorParameters,
    OscillatorVoiceConstructorParameters,
    NoteToPlay,
    StartNote,
    StopNote,
    Voice,
    SampleData,
    SampleDatas,
    ModulePath,
    SampleName,
}
