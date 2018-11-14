// tslint:disable:no-type-definitions-outside-types-modules variable-name no-unsafe-any

import { logMessageToScreen } from '../utilities'

interface AudioContextConstructor {
    new (): AudioContext;
}

// @ts-ignore
const AudioContext: AudioContextConstructor = global.AudioContext || global.webkitAudioContext || false

let context: AudioContext
if (AudioContext) {
    context = new AudioContext()
}
else {
    // tslint:disable-next-line:max-line-length
    logMessageToScreen('Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox')
}

export {
    context,
}
