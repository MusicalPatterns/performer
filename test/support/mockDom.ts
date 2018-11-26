// tslint:disable

// @ts-ignore
require('browser-env')()
// @ts-ignore
declare const global: any

global.requestAnimationFrame = (callback: any) => {
    setTimeout(callback, 0)
}

global.cancelAnimationFrame = (id: number) => {
    clearTimeout(id)
}

const mockOscillator: any = {
    connect: () => {
    },
    start: () => {
    },
}

const mockGain: any = {
    connect: () => {
    },
    gain: {},
}

const mockAudioContext: any = {
    createOscillator: () => mockOscillator,
    createGain: () => mockGain,
}

global.AudioContext = () => mockAudioContext
global.webkitAudioContext = () => mockAudioContext

global.XMLHttpRequest = () => ({
    open: () => {
    },
    send: () => {
    },
})

global.self = {
    postMessage: () => {
    },
}
