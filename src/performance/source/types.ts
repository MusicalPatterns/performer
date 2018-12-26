import { Frequency, Maybe, Scalar } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { Timbre, VoiceType } from '../../types'

interface BuildSourceNodeParameters {
    frequency: Frequency,
    playbackRate?: Maybe<Scalar>,
    timbre: Timbre,
    voiceType: VoiceType,
    webVr?: Vrb,

    // tslint:disable-next-line:no-any
    [ index: string ]: any,
}

type SourceNode = (AudioBufferSourceNode | OscillatorNode) &
    SourceNodeTimbreSetterKeyIndexSignature &
    SourceNodePitchKeyIndexSignature

type SourceNodePitchKeyIndexSignature = {
    [K in SourceNodePitchKey]: SourceNodePitchObject
}

type SourceNodeTimbreSetterKeyIndexSignature = {
    [K in SourceNodeTimbreSetterKey]: SourceNodeTimbreSetter
}

interface SourceNodePitchObject {
    value: number,
}

type SourceNodeTimbreSetter = (timbre: Timbre) => void

interface SourceNodeBuildingKeys {
    immersiveKey: SourceNodeImmersiveKey,
    pitchKey: SourceNodePitchKey,
    standardKey: SourceNodeStandardKey,
    timbreSetterKey: SourceNodeTimbreSetterKey,
}

enum SourceNodeImmersiveKey {
    createSpatialBufferSource = 'createSpatialBufferSource',
    createSpatialOscillator = 'createSpatialOscillator',
}

enum SourceNodePitchKey {
    frequency = 'frequency',
    playbackRate = 'playbackRate',
}

enum SourceNodeStandardKey {
    createBufferSource = 'createBufferSource',
    createOscillator = 'createOscillator',
}

enum SourceNodeTimbreSetterKey {
    setPeriodicWave = 'setPeriodicWave',
    setBuffer = 'setBuffer',
}

export {
    BuildSourceNodeParameters,
    SourceNode,
    SourceNodePitchObject,
    SourceNodeTimbreSetter,
    SourceNodeBuildingKeys,
    SourceNodeImmersiveKey,
    SourceNodePitchKey,
    SourceNodePitchKeyIndexSignature,
    SourceNodeStandardKey,
    SourceNodeTimbreSetterKey,
    SourceNodeTimbreSetterKeyIndexSignature,
}
