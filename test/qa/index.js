import { snapshot } from '@musical-patterns/pattern-performer-qa'
// tslint:disable-next-line:only-import-index-for-test-from-src
import { enableImmersiveAudio, perform, setupPerformer } from '../../src'

const setupQa = async () => {
    await setupPerformer({ threadSpecs: snapshot })
    const enterImmersiveAudioHandler = enableImmersiveAudio()

    const resetButton = document.createElement('div')
    resetButton.innerText = 'Reset'
    resetButton.addEventListener('click', async () => {
        await perform(snapshot)
    })
    document.body.appendChild(resetButton)

    const enterImmersiveAudioButton = document.createElement('div')
    enterImmersiveAudioButton.innerText = 'Enter Immersive Audio'
    enterImmersiveAudioButton.addEventListener('click', enterImmersiveAudioHandler)
    document.body.appendChild(enterImmersiveAudioButton)
}

setupQa()
