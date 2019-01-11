import { snapshot } from '@musical-patterns/pattern-performer-qa'
// tslint:disable-next-line:only-import-index-for-test-from-src
import { enableImmersiveAudio, togglePaused, setTime, stop, setupPerformer } from '../../src'

const setupQa = async () => {
    await setupPerformer({ threadSpecs: snapshot })
    const toggleImmersiveAudioHandler = enableImmersiveAudio()

    const setTimeButton = document.createElement('button')
    setTimeButton.innerText = 'Set Time (to 14800)'
    setTimeButton.addEventListener('click', () => setTime(14800))
    document.body.appendChild(setTimeButton)

    const stopButton = document.createElement('button')
    stopButton.innerText = 'Stop'
    stopButton.addEventListener('click', stop)
    document.body.appendChild(stopButton)

    const togglePausedButton = document.createElement('button')
    togglePausedButton.innerText = 'Toggle Paused'
    togglePausedButton.addEventListener('click', togglePaused)
    document.body.appendChild(togglePausedButton)

    const toggleImmersiveAudioButton = document.createElement('button')
    toggleImmersiveAudioButton.innerText = 'Toggle Immersive Audio'
    toggleImmersiveAudioButton.addEventListener('click', toggleImmersiveAudioHandler)
    document.body.appendChild(toggleImmersiveAudioButton)
}

setupQa()
