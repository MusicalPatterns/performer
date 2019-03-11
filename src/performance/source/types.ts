import { Hz, Maybe, Scalar } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SourceType, Timbre } from '../types'

interface ComputeSourceNodeParameters {

    // tslint:disable-next-line no-any
    [ index: string ]: any,
    frequency: Hz,
    immersiveAudioEnabled: boolean,
    playbackRate?: Maybe<Scalar>,
    sourceType: SourceType,
    timbre: Timbre,
    webVr?: Vrb,
}

type SourceNode = SampleSourceNode | OscillatorSourceNode

type SampleSourceNode = AudioBufferSourceNode & TimbreSetterKeyIndexSignature & PitchKeyIndexSignature
type OscillatorSourceNode = OscillatorNode & TimbreSetterKeyIndexSignature & PitchKeyIndexSignature

type PitchKeyIndexSignature = {
    [Index in PitchKey]: PitchObject
}

type TimbreSetterKeyIndexSignature = {
    [Index in TimbreSetterKey]: TimbreSetter
}

interface PitchObject {
    value: number,
}

type TimbreSetter = (timbre: Timbre) => void

interface SourceNodeComputingKeys {
    immersiveKey: ImmersiveKey,
    pitchKey: PitchKey,
    standardKey: StandardKey,
    timbreSetterKey: TimbreSetterKey,
}

enum ImmersiveKey {
    createSpatialBufferSource = 'createSpatialBufferSource',
    createSpatialOscillator = 'createSpatialOscillator',
}

enum PitchKey {
    frequency = 'frequency',
    playbackRate = 'playbackRate',
}

enum StandardKey {
    createBufferSource = 'createBufferSource',
    createOscillator = 'createOscillator',
}

enum TimbreSetterKey {
    setPeriodicWave = 'setPeriodicWave',
    setBuffer = 'setBuffer',
}

interface SetPitchObjectValueParameters {
    computeSourceNodeParameters: ComputeSourceNodeParameters,
    pitchKey: PitchKey,
    sourceNode: SourceNode,
}

export {
    ComputeSourceNodeParameters,
    SourceNode,
    PitchObject,
    TimbreSetter,
    SourceNodeComputingKeys,
    ImmersiveKey,
    PitchKey,
    PitchKeyIndexSignature,
    StandardKey,
    TimbreSetterKey,
    TimbreSetterKeyIndexSignature,
    SampleSourceNode,
    OscillatorSourceNode,
    SetPitchObjectValueParameters,
}
