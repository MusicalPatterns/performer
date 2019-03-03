import { noop } from '@musical-patterns/utilities'
import { buildSampleData } from '../construction'
import { activateContextInMobileBrowserEnvironments, setupClock, setupTimeControls } from '../setup'
import { play } from './play'
import { setThreadSpecs } from './setThreadSpecs'
import { SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: SetupPerformerParameters) => Promise<void> =
    async ({ onUpdate = noop, threadSpecs }: SetupPerformerParameters = {}): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        buildSampleData()
        setupClock()

        if (threadSpecs) {
            await setThreadSpecs(threadSpecs)
            play()
        }
    }

export {
    setupPerformer,
}
