import { snapshot } from '@musical-patterns/pattern-performer-qa'
import { to } from '@musical-patterns/utilities'
import { enableImmersiveAudio, setTimePosition, setupPerformer, togglePaused } from './interface'

const setupQa: () => Promise<void> =
    async (): Promise<void> => {
        await setupPerformer({ threadSpecs: snapshot })
        const toggleImmersiveAudioHandler: VoidFunction = enableImmersiveAudio()

        const setTimeButton: HTMLElement = document.createElement('button')
        setTimeButton.innerText = 'Set Ms (to 14800)'
        // tslint:disable-next-line no-magic-numbers
        setTimeButton.addEventListener('click', async () => setTimePosition(to.Ms(14800)))
        document.body.appendChild(setTimeButton)

        const stopButton: HTMLElement = document.createElement('button')
        stopButton.innerText = 'Stop'
        stopButton.addEventListener('click', stop)
        document.body.appendChild(stopButton)

        const togglePausedButton: HTMLElement = document.createElement('button')
        togglePausedButton.innerText = 'Toggle Paused'
        togglePausedButton.addEventListener('click', togglePaused)
        document.body.appendChild(togglePausedButton)

        const toggleImmersiveAudioButton: HTMLElement = document.createElement('button')
        toggleImmersiveAudioButton.innerText = 'Toggle Immersive Audio'
        toggleImmersiveAudioButton.addEventListener('click', toggleImmersiveAudioHandler)
        document.body.appendChild(toggleImmersiveAudioButton)
    }

setupQa()
    .then()
    .catch()
