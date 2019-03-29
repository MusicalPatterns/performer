import { noop } from '@musical-patterns/utilities'
import { computeSampleData } from '../preparation'
import { activateContextInMobileBrowserEnvironments, OnUpdate, setupClock, setupTimeControls } from '../setup'
import { Voice } from '../types'
import { play } from './play'
import { setVoices } from './setVoices'
import { SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: { onUpdate?: OnUpdate, voices?: Voice[] }) => Promise<void> =
    async ({ onUpdate = noop, voices }: SetupPerformerParameters = {}): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        computeSampleData()
        setupClock()

        if (voices) {
            await setVoices(voices)
            play()
        }
    }

export {
    setupPerformer,
}
