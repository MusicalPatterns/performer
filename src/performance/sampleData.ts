import { Cents, CENTS_PER_SEMITONE, from, SampleName, Semitones, to } from '@musical-patterns/shared'
import {
    DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    UP_TWO_SEMITONES,
} from './constants'
import { SampleDatas } from './types'

const shiftSemitones: (semitones: Semitones) => Cents = (semitones: Semitones): Cents =>
    to.Cents(from.Semitones(semitones) * from.Cents(CENTS_PER_SEMITONE))

const buildSampleData: () => SampleDatas =
    (): SampleDatas => ({
        [ SampleName.CELLO ]: {},
        [ SampleName.DOUBLE_BASS ]: {
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
        [ SampleName.SNARE ]: {
            unpitched: true,
        },
        [ SampleName.KICK ]: {
            unpitched: true,
        },
        [ SampleName.HIHAT ]: {
            unpitched: true,
        },
    })

export {
    buildSampleData,
}
