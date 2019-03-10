import { noop } from '@musical-patterns/utilities'
import { buildSampleData } from '../preparation'
import { activateContextInMobileBrowserEnvironments, setupClock, setupTimeControls } from '../setup'
import { play } from './play'
import { setVoices } from './setVoices'
import { SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: SetupPerformerParameters) => Promise<void> =
    async ({ onUpdate = noop, voices }: SetupPerformerParameters = {}): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        buildSampleData()
        setupClock()

        if (voices) {
            await setVoices(voices)
            play()
        }
    }

export {
    setupPerformer,
}
