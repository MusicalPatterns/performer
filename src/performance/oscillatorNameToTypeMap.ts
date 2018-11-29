import { OscillatorName, OscillatorNameToTypeMap } from './types'

const oscillatorNameToTypeMap: OscillatorNameToTypeMap = {
    [ OscillatorName.CUSTOM ]: 'custom',
    [ OscillatorName.SAWTOOTH ]: 'sawtooth',
    [ OscillatorName.SINE ]: 'sine',
    [ OscillatorName.SQUARE ]: 'square',
    [ OscillatorName.TRIANGLE ]: 'triangle',
}

export {
    oscillatorNameToTypeMap,
}
