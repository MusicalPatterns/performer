import { Frequency, Maybe, Scalar } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { Timbre, VoiceType } from '../types'

interface BuildSourceNodeParameters {
    frequency: Frequency,
    immersiveAudio: boolean,
    playbackRate?: Maybe<Scalar>,
    timbre: Timbre,
    voiceType: VoiceType,
    webVr?: Vrb,

    // tslint:disable-next-line:no-any
    [ index: string ]: any,
}

type SourceNode = (AudioBufferSourceNode | OscillatorNode) &
    TimbreSetterKeyIndexSignature &
    PitchKeyIndexSignature

type PitchKeyIndexSignature = {
    [K in PitchKey]: PitchObject
}

type TimbreSetterKeyIndexSignature = {
    [K in TimbreSetterKey]: TimbreSetter
}

interface PitchObject {
    value: number,
}

type TimbreSetter = (timbre: Timbre) => void

interface SourceNodeBuildingKeys {
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

export {
    BuildSourceNodeParameters,
    SourceNode,
    PitchObject,
    TimbreSetter,
    SourceNodeBuildingKeys,
    ImmersiveKey,
    PitchKey,
    PitchKeyIndexSignature,
    StandardKey,
    TimbreSetterKey,
    TimbreSetterKeyIndexSignature,
}
