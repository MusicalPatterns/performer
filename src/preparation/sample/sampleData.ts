import { apply, Cents, CENTS_PER_SEMITONE, Semitones, to } from '@musical-patterns/utilities'
import { StateKey, store } from '../../state'
import {
    DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    UP_TWO_SEMITONES,
} from './constants'
import { SampleDatas, SampleName } from './types'

const shiftSemitones: (semitones: Semitones) => Cents =
    (semitones: Semitones): Cents =>
        apply.Scalar(CENTS_PER_SEMITONE, to.Scalar(semitones))

const computeSampleData: VoidFunction =
    (): void => {
        const sampleData: SampleDatas = {
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
        }

        store.dispatch({ type: StateKey.SAMPLE_DATA, data: sampleData })
    }

export {
    computeSampleData,
}