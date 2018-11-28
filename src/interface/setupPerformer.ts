import { loadAllSamples } from '../performance'
import { activateContextInMobileBrowserEnvironments, setupThreadsListener, setupTimeControls } from '../setup'
import { SetupPerformerParameters } from './types'

const setupPerformer: (setupPerformerParameters: SetupPerformerParameters) => void =
    ({ onUpdate }: SetupPerformerParameters): void => {
        loadAllSamples()
        activateContextInMobileBrowserEnvironments()
        setupThreadsListener()
        setupTimeControls(onUpdate)
    }

export {
    setupPerformer,
}
