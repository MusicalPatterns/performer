import { Cents, from, Semitones, to } from '../nominal'
import {
    CENTS_PER_SEMITONE, DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES, UP_TWO_SEMITONES,
} from './constants'
import { SampleName } from './samples'

interface SampleData {
    centsAdjustment?: Cents,
}

type SampleDatas = { [x in SampleName]: SampleData }

const shiftSemitones: (semitones: Semitones) => Cents = (semitones: Semitones): Cents =>
    to.Cents(from.Semitones(semitones) * from.Cents(CENTS_PER_SEMITONE))

const buildSampleData: () => SampleDatas =
    (): SampleDatas => ({
        [ SampleName.CELLO ]: {},
        [ SampleName.DOUBLEBASS ]: {
            centsAdjustment: shiftSemitones(UP_TWO_OCTAVES_IN_SEMITONES),
        },
        [ SampleName.FLUTE ]: {},
        [ SampleName.PIANO ]: {
            centsAdjustment: shiftSemitones(DOWN_TWO_OCTAVES_IN_SEMITONES),
        },
        [ SampleName.TROMBONE ]: {
            centsAdjustment: shiftSemitones(UP_TWO_SEMITONES),
        },
        [ SampleName.TRUMPET ]: {
            centsAdjustment: shiftSemitones(DOWN_ONE_SEMITONE),
        },
        [ SampleName.TUBA ]: {
            centsAdjustment: shiftSemitones(UP_ONE_OCTAVE_IN_SEMITONES),
        },
        [ SampleName.VIOLIN ]: {},
        [ SampleName.SNARE ]: {},
        [ SampleName.KICK ]: {},
        [ SampleName.HIHAT ]: {},
    })

export {
    buildSampleData,
    SampleDatas,
}
